"""Generate a THETIS MEDICAL LTD invoice PDF matching the standard layout."""

from fpdf import FPDF
from pathlib import Path

OUTPUT_DIR = Path(__file__).parent / "output"


class InvoicePDF(FPDF):
    def header(self):
        pass  # Custom layout in body

    def footer(self):
        pass


def draw_metadata_row(pdf: FPDF, label: str, value: str, x_label: float, x_value: float, y: float, font: str = "Arial"):
    pdf.set_xy(x_label, y)
    pdf.set_font(font, "", 10)
    pdf.cell(50, 5, label)
    pdf.set_xy(x_value, y)
    pdf.cell(80, 5, value)


def generate_invoice(output_path: Path) -> None:
    pdf = InvoicePDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=False)
    pdf.add_page()
    pdf.set_margins(20, 20, 20)

    # Arial supports the Euro symbol used in the invoice
    font_dir = Path("C:/Windows/Fonts")
    pdf.add_font("Arial", "", str(font_dir / "arial.ttf"))
    pdf.add_font("Arial", "B", str(font_dir / "arialbd.ttf"))
    font = "Arial"

    left = 20
    right = 190
    page_width = 210

    # --- Header ---
    pdf.set_xy(left, 20)
    pdf.set_font(font, "B", 11)
    pdf.cell(100, 6, "THETIS MEDICAL LTD")

    pdf.set_xy(right - 40, 18)
    pdf.set_font(font, "B", 22)
    pdf.cell(40, 10, "Invoice", align="R")

    # --- Metadata ---
    y = 38
    metadata = [
        ("Invoice Number", "INV-10"),
        ("Issued on", "19 September 2025"),
        ("Due date", "26 September 2025"),
        ("Date of sale / supply", "19 September 2025"),
    ]
    for label, value in metadata:
        draw_metadata_row(pdf, label, value, left, left + 55, y, font)
        y += 6

    # --- Addresses ---
    y += 10
    col_mid = page_width / 2

    # Billed to
    pdf.set_xy(left, y)
    pdf.set_font(font, "B", 10)
    pdf.cell(80, 5, "Billed to")
    pdf.set_font(font, "", 10)
    billed_lines = [
        "P.J. Stasuk",
        "pstasuk@oberlin.edu",
        "10900 Greenhaven Parkway, 44141, Brecksville, United States",
    ]
    for i, line in enumerate(billed_lines):
        pdf.set_xy(left, y + 6 + i * 5)
        pdf.multi_cell(85, 5, line)

    # From
    pdf.set_xy(col_mid, y)
    pdf.set_font(font, "B", 10)
    pdf.cell(80, 5, "From")
    pdf.set_font(font, "", 10)
    from_lines = [
        "THETIS MEDICAL LTD",
        "15 Leopold Street, B12 0UP, Birmingham, United Kingdom",
        "VAT Number: 412039441",
    ]
    for i, line in enumerate(from_lines):
        pdf.set_xy(col_mid, y + 6 + i * 5)
        pdf.multi_cell(85, 5, line)

    # --- Items table ---
    y = 105
    pdf.set_xy(left, y)
    pdf.set_font(font, "B", 10)
    pdf.cell(40, 5, "Item")

    y += 8
    table_left = left
    table_right = right
    table_width = table_right - table_left

    # Column widths (mm)
    col_desc = 70
    col_price = 25
    col_qty = 25
    col_tax = 25
    col_amount = table_width - col_desc - col_price - col_qty - col_tax

    col_x = [
        table_left,
        table_left + col_desc,
        table_left + col_desc + col_price,
        table_left + col_desc + col_price + col_qty,
        table_left + col_desc + col_price + col_qty + col_tax,
    ]

    # Header row
    pdf.set_font(font, "B", 9)
    headers = ["Name / description", "Price", "Quantity", "Tax rate", "Amount"]
    aligns = ["L", "R", "C", "C", "R"]
    col_widths = [col_desc, col_price, col_qty, col_tax, col_amount]

    for i, (header, align, w) in enumerate(zip(headers, aligns, col_widths)):
        pdf.set_xy(col_x[i], y)
        pdf.cell(w, 6, header, align=align)

    # Thick line under headers
    y += 7
    pdf.set_line_width(0.6)
    pdf.line(table_left, y, table_right, y)
    pdf.set_line_width(0.2)

    # Data row
    y += 3
    pdf.set_font(font, "", 9)
    row_data = ["", "€0.00", "1", "-", "€0.00"]
    for i, (data, align, w) in enumerate(zip(row_data, aligns, col_widths)):
        pdf.set_xy(col_x[i], y)
        pdf.cell(w, 6, data, align=align)

    # Thin line under data
    y += 8
    pdf.line(table_left, y, table_right, y)

    # --- Totals ---
    totals_x_label = table_right - 50
    totals_x_value = table_right - col_amount
    y += 6

    pdf.set_font(font, "", 9)
    pdf.set_xy(totals_x_label, y)
    pdf.cell(20, 5, "Subtotal", align="R")
    pdf.set_xy(totals_x_value, y)
    pdf.cell(col_amount, 5, "€0.00", align="R")

    y += 7
    pdf.line(totals_x_label, y, table_right, y)

    y += 3
    pdf.set_font(font, "B", 9)
    pdf.set_xy(totals_x_label, y)
    pdf.cell(20, 5, "Total", align="R")
    pdf.set_xy(totals_x_value, y)
    pdf.cell(col_amount, 5, "€0.00", align="R")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(output_path))


if __name__ == "__main__":
    out = OUTPUT_DIR / "INV-10.pdf"
    generate_invoice(out)
    print(f"Generated: {out}")
