function validateDisposableEmailAddress(dea)
{
  if (dea.trim() === "")
    throw new Error("Please enter an email address or domain name");
  
  else if (dea.trim().indexOf("@") !== -1) {
    if (!validateEmail(dea.trim()))
      throw new Error("The email address is invalid");
  }
    
  else if (!validateDomain(dea.trim()))
    throw new Error("The domain name is invalid");
}

function validateEmail(email)
{
    var emailPattern = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,10})$/;
    return emailPattern.test(email.trim());
}

function validateDomain(domain)
{
    var domainPattern = /^(?!\-)(?:[a-zA-Z\d\-]{0,62}[a-zA-Z\d]\.){1,126}(?!\d+)[a-zA-Z\d]{1,63}$/;
    return domainPattern.test(domain.trim());
}

export {validateDisposableEmailAddress, validateEmail, validateDomain};