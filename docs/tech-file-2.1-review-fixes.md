# Tech file 2.1.0 — review fixes (MPD / no Vgtec)

Use Find & Replace in the Google Doc, then paste the replacement blocks where noted.

---

## Critical: remove Vgtec (still present)

**Find:** `Vgtec` / `Vgtec limited` / `Vgtec Limited`  
**Also find:** `[NAME — Vgtec Limited or MPD — pick one and use consistently]`

### A. §3.1.2 Design sites — replace sewing line

**Replace:**

```
Higher Fidelity Prototyping - Sewing:
Vgtec limited, Jasmine House, C1 Cunliffe Road, Whitebirk Industrial Estate, Blackburn, England, BB1 5UA
```

**With:**

```
Higher Fidelity Prototyping - Sewing / soft-goods assembly:
MPD (hook-and-loop / textile manufacturing), United Kingdom
```

*(Materialise for historical 3D-print prototypes is fine to keep — that is design history, not current manufacture.)*

### B. §3.2.2 Manufacturing sites — replace list

**Replace the numbered list with:**

```
The following numbers correspond to the flow chart above.

1. RP Technologies Limited, 54 Second Avenue, Pensnett Trading Estate, Kingswinford, West Midlands, DY6 7XJ, United Kingdom — injection moulding of polypropylene shells.
2. MPD, United Kingdom — hook-and-loop / textile components and sewing / soft-goods manufacturing and assembly of padding and straps to the shell.
3. Packhelp, Airtech Business Park, Kolejowa 5/7, Warsaw, 01-217, Poland — primary packaging (printed carton).
4. Hello Print, 2:06 Clockwise, Edward Pavilion, Albert Dock, Liverpool L3 4AF, United Kingdom — IFU printing.
```

### C. §3.4 opening + table — replace entirely

**Replace:**

```
Sewing – Vgtec Limited
Injection Moulding – RP Technologies Limited
```

**and the §3.4.1 table**

**With:**

```
Outsourced processes (current production):
• Injection moulding — RP Technologies Limited
• Soft goods, hook-and-loop, sewing / assembly — MPD

3.4.1 Overview of outsourced processes

| Process | Executing company |
|---------|-------------------|
| Injection moulding (PP shell) | RP Technologies Limited, 54 Second Avenue, Pensnett Trading Estate, Kingswinford, West Midlands, DY6 7XJ, United Kingdom |
| Soft goods / hook-and-loop / sewing & assembly | MPD, United Kingdom |
| Packaging printing | Packhelp, Airtech Business Park, Kolejowa 5/7, Warsaw, 01-217, Poland |
| Instructions printing | Hello Print, 2:06 Clockwise, Edward Pavilion, Albert Dock, Liverpool L3 4AF, United Kingdom |
```

### D. §3.4.3 critical subcontractors table — fix the two MPD rows

**Delete** the separate row that still says `[NAME — Vgtec Limited or MPD…]`.

**Use one combined MPD row:**

| Process | Subcontractor | QA / supply control in place |
| --------- | --------------- | ------------------------------ |
| Injection moulding (PP shell) | RP Technologies Limited, 54 Second Avenue, **Pensnett** Trading Estate, Kingswinford, West Midlands, DY6 7XJ, United Kingdom | Purchase orders against approved CAD/drawing and material specification (medical polypropylene). Supplier operates under ISO 9001. Incoming inspection of moulded shells (dimensions, finish, L/R identification, flash/defects). Non-conforming product returned or quarantined. |
| Soft goods, hook-and-loop, sewing / assembly | **MPD**, United Kingdom | Purchase against specification for hook-and-loop / textiles (OEKO-TEX® Standard 100 Class II or equivalent on file). Sewing/assembly to approved BOM and golden sample. Incoming/final inspection of stitch integrity, strap attachment, foam sew quality, L/R and size marking. |
| Primary packaging (printed carton) | Packhelp | Artwork approval; print proof sign-off; spot check of UDI/label content on receipt. |
| IFU printing | Hello Print | Controlled IFU master; print proof approval; version control. |

**Also update** “For RP Technologies and the sewing/assembly supplier” → **“For RP Technologies and MPD”**.

**Evidence table:** remove separate “Sewing / assembly supplier” row; keep:

| Supplier | Evidence |
| ---------- | ---------- |
| RP Technologies | ISO 9001 certificate / capability confirmation; PP material TDS / REACH statement as supplied |
| MPD | OEKO-TEX® Standard 100 (Class II) evidence for specified fastener/textile products; approved first-article / golden sample for assembled soft goods |
| Packaging / IFU printers | Approved artwork and print proofs |

### E. Typos — same address spelled two ways

**Find:** `Penspett` → **Replace with:** `Pensnett` (everywhere)

---

## Other issues still in 2.1.0

| Priority | Issue | Fix |
| ---------- | -------- | ----- |
| High | **§1.4 DoC still blank** (`____`) | Paste signed Annex IV DoC |
| High | **§7.2.2 units still `[insert]`** | Put real period volume |
| Medium | **Editorial junk** still in body (“I have updated the Technical Documentation…”, “Revised Document Sections”) | Delete — looks like AI/editor notes, not controlled content |
| Medium | **Duplicate BER** near end of doc (full BER repeated after PMSR) | Keep §6.1 + annex once; delete the duplicate block at the end |
| Medium | **Typos:** `heeling` → `healing`; `heeled Achilles` → `healed Achilles` (principles of operation + EN IFU) | Find/replace |
| Low | Title casing / “class 1” vs “Class I” | Prefer **Class I** |
| Low | §1.10 QM still says N/A for MDD while MDR QMS text was inserted earlier as a revision note | Keep one clean MDR Art. 10 QMS paragraph under §1.10; remove the “only for MDD / N/A” contradiction |
| OK | **Jacón** | Not found — good |
| OK | GMDN 37470 table | Present |
| OK | Italian IFU | Present |
| OK | §6.1 / §6.7 / §4.2 / §6.5 / §3.3 | Largely pasted |

---

## Suggested current supply chain (one sentence for consistency)

> Shells are injection-moulded by **RP Technologies**; soft goods, hook-and-loop and sewing/assembly are performed by **MPD**; cartons by **Packhelp**; IFUs by **Hello Print**. Thetis Medical Ltd is the legal manufacturer.
