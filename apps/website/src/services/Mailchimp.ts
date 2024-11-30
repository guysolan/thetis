function loadMailchimp(): void {
  connectMailchimp()
  validateMailchimp()
  jQueryMailchimp()
}

const mailchimpInput = document.getElementById('mce-EMAIL') as HTMLInputElement
mailchimpInput?.addEventListener('click', loadMailchimp)

function validateMailchimp(): void {
  let validate = document.getElementById('valmc')
  if (validate == null) {
    // console.log('validating mailchimp')
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('id', 'valmc')
    script.setAttribute(
      'src',
      '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'
    )
    document.head.appendChild(script)
  }
}

function connectMailchimp(): void {
  let connected = document.getElementById('mjcs')
  if (connected == null) {
    // console.log('connecting mailchimp')
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('id', 'mjcs')
    let mcjsScript = `! function (c, h, i, m, p) { m = c.createElement(h), p = c.getElementsByTagName(h)[0], m.async = 1, m.src = i, p.parentNode.insertBefore( m, p)}(document, "script", "https://chimpstatic.com/mcjs-connected/js/users/c24150147626fd5e19c7684c6/d7e07f4cbe8075f8afbf34db0.js");`
    script.setAttribute('innerHTML', mcjsScript)
    document.head.appendChild(script)
  }
}

function jQueryMailchimp(): void {
  let jqmc = document.getElementById('jqmc')
  if (jqmc == null) {
    // console.log('jQuery mailchimp')
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('id', 'jqmc')
    let jqmcScript = `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='COMPANY';ftypes[1]='text';fnames[2]='ADDRESS';ftypes[2]='address';}(jQuery));var $mcj = jQuery.noConflict(true);`
    script.setAttribute('innerHTML', jqmcScript)
    document.head.appendChild(script)
  }
  console.log('do')
}
