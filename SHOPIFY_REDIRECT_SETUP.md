# How to Configure Shopify Checkout Redirect

## Method 1: Order Status Page Scripts (Easiest) ✅

This is the recommended method - works for all Shopify plans.

### Steps:

1. **Go to Shopify Admin**
   - Navigate to: **Settings → Checkout**

2. **Scroll to "Order processing" section**

3. **Find "Additional scripts" field**
   - This is where you can add JavaScript that runs on the order status/thank you page

4. **Add this script:**

```javascript
<script>
(function() {
  // Check if order contains course products
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
    // Redirect to course claim page after 1 second delay
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

### Alternative: Check by Product Title

If product IDs don't work, use product titles:

```javascript
<script>
(function() {
  // Check if order contains course products by title
  {% assign has_course = false %}
  {% for line_item in order.line_items %}
    {% if line_item.product.title contains 'Standard Course' or line_item.product.title contains 'Premium Course' %}
      {% assign has_course = true %}
      {% break %}
    {% endif %}
  {% endfor %}
  
  {% if has_course %}
    setTimeout(function() {
      var email = '{{ order.email | url_encode }}';
      var orderNumber = '{{ order.order_number }}';
      window.location.replace('https://course.thetismedical.com/claim?email=' + email + '&order=' + orderNumber);
    }, 1000);
  {% endif %}
})();
</script>
```

## Method 2: Shopify Flow (More Control)

If you have Shopify Flow available:

1. **Go to Shopify Admin**
   - Apps → Shopify Flow (install if needed)

2. **Create New Workflow:**
   - **Trigger:** "Order created" or "Order paid"
   - **Condition:** Order contains product
     - Product: Standard Course OR Premium Course

3. **Add Action:**
   - **Action:** "Send customer notification"
   - **Message:** Include link: `https://course.thetismedical.com/claim?email={{ customer.email }}&order={{ order.number }}`
   - OR use "Redirect customer" action if available

## Method 3: Thank You Page App

Use a Shopify app to customize the thank you page:

1. **Install app** like:
   - "Thank You Page" by Beeketing
   - "Order Status Page Customizer"
   - "Checkout Customizer"

2. **Configure redirect:**
   - Set condition: Order contains course products
   - Set redirect URL: `https://course.thetismedical.com/claim?email={{ order.email }}&order={{ order.order_number }}`

## Testing

### Test the Redirect:

1. **Place a test order** with Standard Course
2. **Complete checkout**
3. **After payment**, you should be redirected to:
   ```
   https://course.thetismedical.com/claim?email=test@example.com&order=1001
   ```
4. **Verify** claim page shows:
   - "Thanks for your purchase!"
   - Order number
   - Email pre-filled

### Troubleshooting

**Redirect not working?**
- ✅ Check if script is saved correctly in Shopify Admin
- ✅ Verify product IDs/names match exactly
- ✅ Check browser console for JavaScript errors
- ✅ Try increasing delay: `setTimeout(..., 2000)` (2 seconds)
- ✅ Make sure order actually contains course products

**Redirect happens but order not found?**
- ⏱️ Webhook might not have processed yet (wait 1-2 minutes)
- ✅ Check webhook logs: `supabase functions logs shopify-order-webhook`
- ✅ Verify enrollment in database:
  ```sql
  SELECT * FROM enrollments 
  WHERE shopify_customer_email = 'test@example.com'
  ORDER BY created_at DESC;
  ```

**Wrong URL format?**
- ✅ Email should be URL encoded: `{{ order.email | url_encode }}`
- ✅ Order number should be: `{{ order.order_number }}` (without `#`)
- ✅ The `#` is added automatically in the claim page

## Product IDs Reference

Make sure these match your actual Shopify products:
- **Standard Course:** `9846187786568`
- **Premium Course:** `9846188081480`

To find your product IDs:
1. Go to Shopify Admin → Products
2. Click on a product
3. Look at the URL: `/admin/products/[PRODUCT_ID]`
4. Or use Shopify API to list products

## Recommended Setup

**For most stores, use Method 1 (Order Status Page Scripts):**

1. ✅ Go to **Settings → Checkout**
2. ✅ Scroll to **"Order processing"**
3. ✅ Add script in **"Additional scripts"** field
4. ✅ Save changes
5. ✅ Test with a real order

## Fallback: Email-Only Flow

If redirect doesn't work reliably, the email flow still works:

1. ✅ Customer receives email after purchase
2. ✅ Email contains link to claim page
3. ✅ Customer clicks link → Goes to claim page
4. ✅ Claim page verifies order → Allows account creation

The redirect provides better UX, but email is a reliable fallback.

## Next Steps

1. ✅ Add script to Shopify checkout settings
2. ✅ Test with a real order
3. ✅ Verify redirect works
4. ✅ Verify claim page shows order details
5. ✅ Test account creation flow
