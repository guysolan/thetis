# Step-by-Step: Configure Shopify Redirect

## Based on Your Checkout Settings

### Step 1: Access Checkout Customization

1. **Click "Customize checkout and customer accounts"** (the blue button/link you see)
   - This opens the checkout editor

### Step 2: Find Order Status Page Settings

In the checkout editor:

1. **Look for "Order status page"** section
   - This is where customers land after completing checkout
   - May be in a sidebar or main content area

2. **Find "Additional scripts" or "Scripts" field**
   - This is where you add custom JavaScript
   - Usually at the bottom of the Order status page settings

### Step 3: Add Redirect Script

**Copy and paste this script:**

```javascript
<script>
(function() {
  // Check if order contains course products by product ID
  {% assign course_product_ids = '9846187786568,9846188081480' | split: ',' %}
  {% assign has_course = false %}
  
  {% for line_item in order.line_items %}
    {% assign product_id_string = line_item.product_id | append: '' %}
    {% for course_id in course_product_ids %}
      {% if product_id_string == course_id %}
        {% assign has_course = true %}
        {% break %}
      {% endif %}
    {% endfor %}
    {% if has_course %}{% break %}{% endif %}
  {% endfor %}
  
  {% if has_course %}
    // Redirect to course claim page after 1 second
    setTimeout(function() {
      var email = '{{ order.email | url_encode }}';
      var orderNumber = '{{ order.order_number }}';
      var claimUrl = 'https://course.thetismedical.com/claim?email=' + email + '&order=' + orderNumber;
      window.location.replace(claimUrl);
    }, 1000);
  {% endif %}
})();
</script>
```

### Alternative: If You Can't Find "Additional Scripts"

If you don't see an "Additional scripts" field, try:

**Option A: Use Shopify Flow**
1. Go to **Apps → Shopify Flow**
2. Create workflow: Order created → Redirect customer
3. Set condition: Order contains course products
4. Set redirect URL: `https://course.thetismedical.com/claim?email={{ customer.email }}&order={{ order.number }}`

**Option B: Use Thank You Page App**
1. Install app: "Thank You Page" or "Order Status Page Customizer"
2. Configure redirect for course orders

**Option C: Email-Only Flow**
- Skip redirect, rely on email link
- Email already includes claim link
- Customer clicks email → Goes to claim page

## Where Exactly to Look

In the checkout customization page, look for:

1. **Left sidebar** → "Order status page" section
2. **Main content** → Scroll down to "Order status page" settings
3. **Settings panel** → "Additional scripts" or "Custom scripts" field

The field might be labeled as:
- "Additional scripts"
- "Order status page scripts"
- "Thank you page scripts"
- "Custom JavaScript"

## Quick Test

After adding the script:

1. **Save changes** in checkout editor
2. **Place test order** with Standard Course
3. **Complete checkout**
4. **Should redirect** to claim page automatically

## If Redirect Doesn't Work

The email flow still works as a backup:
- ✅ Email sent after purchase
- ✅ Email contains claim link
- ✅ Customer clicks link → Goes to claim page
- ✅ Claim page verifies order → Allows account creation

The redirect is just for better UX - email is the reliable fallback!
