$(document).ready(() => {

   var clientAns = {}
   clientAns.one = []
   clientAns.two = []
   clientAns.three = []
   clientAns.four = []
   clientAns.five = []
   clientAns.six = []
   clientAns.seven = []
   clientAns.eight = []
   clientAns.nine = []
   clientAns.ten = []
   var origin = location.pathname
   // delay timer
   const delay = () => {
      return new Promise((resolve, reject) => {
         var time = setTimeout(() => {
            resolve('done')
         }, 500)
      }).catch(error => {
         reject(error)
      })
   }
   // for question 1
   $('.body').on('click', '.qt1', async (e) => {
      var id = $('.qt1').filter(e.target).attr('id')
      var text = $('.qt1').filter(e.target).attr('text')
      clientAns.one = [id, text]
      await delay();
      $('#upload-form').html(Question2);
      history.pushState({ page: '2' }, '', `${origin}#two`)
   })
   // for question 2
   $('body').on('click', '.qt2', async (e) => {
      var id = $('.qt2').filter(e.target).attr('id')
      var text = $('.qt2').filter(e.target).attr('text')
      clientAns.two = [id, text]
      await delay();
      $('#upload-form').html(Question3);
      history.pushState({ page: '3' }, '', `${origin}#three`)
   })
   // for question 3
   $('body').on('click', '.qt3', async (e) => {
      var id = $('.qt3').filter(e.target).attr('id')
      var text = $('.qt3').filter(e.target).attr('text')
      clientAns.three = [id, text]
      await delay();
      $('#upload-form').html(Question4);
      history.pushState({ page: '4' }, '', `${origin}#four`)
   })
   // for question 4
   $('body').on('click', '.qt4', async (e) => {
      var id = $('.qt4').filter(e.target).attr('id')
      var text = $('.qt4').filter(e.target).attr('text')
      clientAns.four = [id, text]
      await delay();
      $('#upload-form').html(Question5);
      history.pushState({ page: '5' }, '', `${origin}#five`)
      runSlider()
   })
   // for question 5
   $('body').on('click', '.qt5', async (e) => {
      var value = $('#myRange').val();
      clientAns.five = ['myRange', value]
      await delay();
      $('#upload-form').html(Question6);
      history.pushState({ page: '6' }, '', `${origin}#six`)
      runSlider()
   })
   // for question 6
   $('body').on('click', '.qt6', async (e) => {
      var value = $('#myRange').val();
      clientAns.six = ['myRange', value]
      await delay();
      $('#upload-form').html(Question7);
      history.pushState({ page: '7' }, '', `${origin}#seven`)
      runSlider('7')
   })
   // for question 7
   $('body').on('click', '.qt7', async (e) => {
      var value = $('#myRange').val();
      var output = $('.out_put').text();
      clientAns.seven = ['myRange', value, output]
      await delay();
      $('#upload-form').html(Question8);
      history.pushState({ page: '8' }, '', `${origin}#eight`)
   })
   // for question 8
   $('body').on('click', '.qt8', async (e) => {
      var addr = $('#address').val();
      var zCode = $('#z_code').val();
      clientAns.eight = ['object']
      clientAns.eight['address'] = addr
      clientAns.eight['z_code'] = zCode
      if (addr.trim() === '') {
         return displayError('Address is required')
      }
      if (zCode.trim() === '') {
         return displayError('Zip code is required')
      }
      if (isNaN(zCode)) {
         return displayError('Zip code should be numeric')
      }
      if (zCode.length !== 5) {
         return displayError('Invalid zip code')
      }
      $('.error').remove()
      await delay();
      $('#upload-form').html(Question9);
      history.pushState({ page: '9' }, '', `${origin}#nine`)
   })
   // for question 9
   $('body').on('click', '.qt9', async (e) => {
      var id = $('.qt9').filter(e.target).attr('id')
      var text = $('.qt9').filter(e.target).attr('text')
      clientAns.nine = [id, text]
      await delay();
      $('#upload-form').html(Question10);
      history.pushState({ page: '10' }, '', `${origin}#ten`)
   })
   // for question 10
   $('body').on('click', '.qt10', async (e) => {
      e.preventDefault()
      var firstName = $('#first_name').val();
      var lastName = $('#last_name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var altPhone = $('#alt_phone').val();
      clientAns.ten = ['object']
      clientAns.ten['first_name'] = firstName
      clientAns.ten['last_name'] = lastName
      clientAns.ten['email'] = email
      clientAns.ten['phone'] = phone
      clientAns.ten['alt_phone'] = altPhone

      if (firstName === '') {
         return displayError('First Name is required')
      }
      if (lastName === '') {
         return displayError('Last Name is required')
      }
      if (email === '') {
         return displayError('Email is required')
      }
      if (!email.includes('@')) {
         return displayError('Invalid Email')
      }
      if (!email.includes('.')) {
         return displayError('Invalid Email')
      }
      if (phone === '') {
         return displayError('Phone Number required')
      }
      if (isNaN(phone)) {
         return displayError('Invalid phone number')
      }
      if (phone.length > 16) {
         return displayError('Invalid phone number')
      }
      if (altPhone && isNaN(altPhone)) {
         return displayError('Invalid alternative phone number')
      }
      if (altPhone && altPhone.length > 16) {
         return displayError('Invalid alternative phone number')
      }
      $('.error').remove()
      await delay();
      // $('#upload-form').html(Question10);
      [clientAns.seven[1]] = (clientAns.seven[1] / 9.918).toString().substr(0, 5)
   })
   // function to display the sliding value on sliding pages
   const runSlider = (type) => {
      var slider = document.getElementById("myRange");
      var output = document.querySelector(".out_put");
      if (type) {
         output.textContent = '3% or less'
         slider.oninput = function () {
            var val = `${((this.value / 9.918).toString()).substr(0, 5)}%`
            output.textContent = val.includes('3.0') ? '3% or less' : val.includes('6.0') ? '6.0% or over' : val;
         }
      } else {
         runSwitchValue(slider.value, output)
         slider.oninput = function () {
            runSwitchValue(this.value, output)
         }
      }
   }
   // function to switch values and add dollar signs
   const runSwitchValue = (value, output) => {
      var value1 = null
      switch (value.length) {
         case 5:
            value1 = value.substr(0, 2) + "," + value.substr(2)
            break;
         case 6:
            value1 = value.substr(0, 3) + "," + value.substr(3)
            break;
         case 7:
            value1 = value.substr(0, 1) + "," + value.substr(1, 3) + "," + value.substr(4)
            break;
         default:
            value1 = value
      }
      output.textContent = value1 === '50,000' ? `$50,000 or less` : value1 === '750,000' ? '$750,000 or more' : `$${value1}`
   }

   // event handler for navigation button
   window.onpopstate = (e) => {
      var page = location.hash
      switch (page) {
         case '#two':
            $('#upload-form').html(Question2);
            runQuestionOptions(clientAns.two)
            break;
         case '#three':
            $('#upload-form').html(Question3);
            runQuestionOptions(clientAns.three)
            break;
         case '#four':
            $('#upload-form').html(Question4);
            runQuestionOptions(clientAns.four)
            break;
         case '#five':
            $('#upload-form').html(Question5);
            runQuestionOptions(clientAns.five);
            runSlider()
            break;
         case '#six':
            $('#upload-form').html(Question6);
            runQuestionOptions(clientAns.six)
            runSlider()
            break;
         case '#seven':
            $('#upload-form').html(Question7);
            runQuestionOptions(clientAns.seven)
            runSlider('7')
            break;
         case '#eight':
            $('#upload-form').html(Question8);
            runQuestionOptions(clientAns.eight)
            break;
         case '#nine':
            $('#upload-form').html(Question9);
            runQuestionOptions(clientAns.nine)
            break;
         case '#ten':
            $('#upload-form').html(Question10);
            runQuestionOptions(clientAns.ten)
            break;
         default:
            $('#upload-form').html(Question1);
            runQuestionOptions(clientAns.one)
      }
   }

   // function to fix the previous values when the user clicks back button
   const runQuestionOptions = (Question) => {
      if (Question.length === 0) {
         return
      }
      if (Question[0] === 'myRange') {
         return $(`#myRange`).val(parseInt(Question[1]));
      }
      if (Question[0] === 'object') {
         var inputFields = Object.keys(Question)
         for (var i of inputFields) {
            $(`#${i}`).val(Question[i])
         }
         return
      }
      $(`#${Question[0]}`).prop('checked', true)
   }

   // function to display error
   const displayError = (message) => {
      $('.error').text(message)
      $('.error').addClass('p-2')
      $('html,body').animate({ scrollTop: $('.error').offset().top - 100 })
   }

   // display the current year on the footer
   $('.copyright span').text(new Date().getFullYear());
   // display privacy note when the privay is click
   $('body').on('click', '.privacy_policy', () => {
      $('#modal').removeClass('d-none')
      $('#modal-content').html(privacy_policy_text)
   })
   // display license note when is click
   $('body').on('click', '.license', () => {
      $('#modal').removeClass('d-none')
      $('#modal-content').html(license)
   })
   // close the modal when the modal is clicked
   $('#modal').on('click', () => {
      $('#modal').addClass('d-none')
   })







   const Question1 = ` <form>
<p>
   <h5>Question 1 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
      Are you a homeowner?
   </h3>
</p>
<label>
   <p class="form-control">
      <input type="radio" name="radio" class="qt1" id="home_owner" text="Yes, I am a home owner">
      <span>Yes, I am a home owner</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input type="radio" name="radio" class="qt1" id="lookin_to_buy" text="No, I am looking to buy">
      <span>No, I am looking to buy</span>
   </p>
</label>
</form>`


   const Question2 = `<form>
   <p>
      <h5>Question 2 of 11</h5>
   </p>
   <p>
      <h3 class="blue-color">
      What type of home do you have?
      </h3>
   </p>
   <label>
      <p class="form-control">
         <input class="qt2" type="radio" name="radio" id="single_family" text="Signle Family">
         <span>Signle Family</span>
      </p>
   </label>
   <label>
      <p class="form-control">
         <input class="qt2" type="radio" name="radio" id="multipli_family" text="Multiple Family">
         <span>Multiple Family</span>
      </p>
   </label>
   <label>
      <p class="form-control">
         <input class="qt2" type="radio" name="radio" id="condominium" text="Condominium">
         <span>Condominium</span>
      </p>
   </label>
   <label>
      <p class="form-control">
         <input class="qt2" type="radio" name="radio" id="mobile_home" text="Mobile Home">
         <span>Mobile Home</span>
      </p>
   </label>
   </form>`

   const Question3 = `<form>
<p>
   <h5>Question 3 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   How is Your Credit?
   </h3>
   <span>(Most people have good credit)</span>
</p>
<label>
   <p class="form-control">
      <input class="qt3" type="radio" name="radio" id="t700above" text="700+ Excellent">
      <span>700+ Excellent</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt3" type="radio" name="radio" id="t740" text="700 - 640 Good">
      <span>700 - 640 Good</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt3" type="radio" name="radio" id="t640" text="640 - 560 Fair">
      <span>640 - 560 Fair</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt3" type="radio" name="radio" id="t560" text="560- Poor">
      <span>560- Poor</span>
   </p>
</label>
</form>`

   const Question4 = `<form>
<p>
   <h5>Question 4 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   Have you or your spouse served in the military?
   </h3>
</p>
<label>
   <p class="form-control">
      <input class="qt4" type="radio" name="radio" id="verteran" text="Yes, we're a veteran household">
      <span>Yes, we're a veteran household</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt4" type="radio" name="radio" id="not_verteran" text="No, we're not a veteran household">
      <span>No, we're not a veteran household</span>
   </p>
</label>
</form>`

   const Question5 = `<form>
<p>
   <h5>Question 5 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   How much is your home worth?
   </h3>
   <span>(It's ok to estimate)</span>
</p>

<div class="slidecontainer">
<h2 class="out_put text-center py-2"></h2>
<input type="range" min="50000" max="750000" value="50" class="mslider"
   id="myRange">
<!-- <p>Value: <span id="demo"></span></p> -->
</div>
<div class="text-center pt-3"><button type="button" class="btn btn-blue qt5">Next</button>
</form>`

   const Question6 = `<form>
<p>
   <h5>Question 6 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   How much do you owe on your mortgage?
   </h3>
   <span>(It's ok to estimate)</span>
</p>

<div class="slidecontainer">
<h2 class="out_put text-center py-2"></h2>
<input type="range" min="50000" max="750000" value="50" class="mslider"
   id="myRange">
<!-- <p>Value: <span id="demo"></span></p> -->
</div>
<div class="text-center pt-3"><button type="button" class="btn btn-blue qt6">Next</button>
</form>`

   const Question7 = `<form>
<p>
   <h5>Question 7 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   What is your current interest rate?
   </h3>
   <span>(It's ok to estimate)</span>
</p>

<div class="slidecontainer">
<h2 class="out_put text-center py-2"></h2>
<input type="range" min="30" max="60" value="1" class="mslider"
   id="myRange">
<!-- <p>Value: <span id="demo"></span></p> -->
</div>
<div class="text-center pt-3"><button type="button" class="btn btn-blue qt7">Next</button>
</form>`


   const Question8 = `<form>
<p>
   <h5>Question 8 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   Where do you currently live?
   </h3>
   <span>(Property values vary per area - this helps calculate the most accurate offer)</span>
</p>
<p class="text-center my-2"><span class="error"></span></p>
<label for="address">Address</label>
      <p>
      <input class="form-control" type="text" id="address"></p>
<label for="z-code">Zip Code</label>
<p>      <input class="form-control" type="tel" id="z_code" min="8" max="8"></p>
<div class="text-center pt-3"><button type="button" class="btn btn-blue qt8">Next</button>

</form>`



   const Question9 = `<form>
<p>
   <h5>Question 9 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   What is your employment status?
   </h3>
   <span>(This will help us find the right programs for you)</span>
   </p>
<label>
   <p class="form-control">
      <input class="qt9" type="radio" name="radio" id="employed" text="Employed">
      <span>Employed</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt9" type="radio" name="radio" id="self_employed" text="Self Employed">
      <span>Self Employed</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt9" type="radio" name="radio" id="retired" text="Retired">
      <span>Retired</span>
   </p>
</label>
<label>
   <p class="form-control">
      <input class="qt9" type="radio" name="radio" id="unemployed" text="Unemployed">
      <span>Unemployed</span>
   </p>
</label>
</form>`

   const Question10 = `<form>
<p>
   <h5>Question 10 of 11</h5>
</p>
<p>
   <h3 class="blue-color">
   Your rates are ready to view!
   </h3>
   <span>Enter your information for personalized results</span>
</p>
<p class="text-center my-2"><span class="error"></span></p>
<label for="first_name">First Name</label>
      <p>
      <input class="form-control" type="text" id="first_name"></p>
<label for="z-code">Last Name</label>
<p>      <input class="form-control" type="text" id="last_name"></p>

<label for="z-code">Email</label>
<p>      <input class="form-control" type="email" id="email"></p>

<label for="z-code">Phone</label>
<p>      <input class="form-control" type="tel" id="phone"></p>

<label for="alt_phone">Alternative Phone(optional)</label>
<p>      <input class="form-control" type="tel" id="alt_phone"></p>

<p class="text-center pt-3"><button type="button" class="btn btn-blue qt10" >Submit</button></p>

<div class="mt-4" style="font-size:14px">
We take your <a href="#" class="privacy_policy">privacy</a> seriously. By clicking the button, you agree to be matched with<a href="https://quotes.harpreplacement.com/partners" target="_blank"> partners</a> from our network including Quicken Loans, loanDepot and New American Funding, and consent (not required as a condition to purchase a good/service) for us and/or them to contact you (including through automated means; e.g. autodialing, text and pre-recorded messaging) via telephone, mobile device (including SMS and MMS), and/or email, even if you are on a corporate, state or national Do Not Call Registry.
</div>
</form>`

   const privacy_policy_text = `<h1>Privacy Policy / Terms of Use</h1>
   (Amended as of May 16, 2019)
   
   <h4>PLEASE NOTE: OUR PRIVACY POLICY CHANGES FROM TIME TO TIME. PLEASE CHECK BACK FOR UPDATES</h4>
   
  <p> This Web site is not directed at persons under the age of 18. No information collected from children is knowingly used for any marketing or promotional purposes whatsoever, either inside or outside of this website. By registering on this Site through the submission of the information requested, you agree that the following terms and conditions of this Privacy Policy shall govern our use and disclosure of your personal information. When you register with this website, you explicitly authorize us to share your information. If you do not agree with the terms and conditions of our Privacy Policy, please do not complete the information request form (i.e., do not register) or otherwise use or access this Site. If you have already registered by completing the information disclosure forms, and you wish to opt-out from receiving more information from us, please click on this link to "Opt-out." Your e-mail address will be added to the suppression files associated with this Site within ten (10) business days of your request. Thereafter, you should not receive any email correspondence from us. However you will still receive promotional communications from our third party partners with whom we have shared your information. To stop receiving further communications from these third parties you will need to contact them directly in order to opt-out. Please note when you opt-out of receiving promotional communications from us, we will no longer make your information available to our third party partners.
   
   This Privacy Policy describes in some detail the information that we collect from you as part of the normal operation of our service, and what may happen to the information we collect.
   
  <h3> Your privacy is very important to us</h3>
   We understand that some of the information that you might provide on our Site is personal and private. By submitting your personal information, you are entrusting us to handle information that you regard as private, for the purposes and in the manner set forth in this Privacy Policy. In exchange for your trust, you expect us to handle your personal and private information in a professional manner that will be in keeping with your trust. Our Privacy Policy explains what information we obtain on this Site, and how we use the information disclosed to us to link you to our business affiliates who have expressed a willingness to provide you with the products and services associated with this Site.
   
   <h3>Who We Are</h3>
   We are an on-line consumer service that introduces persons such as yourself to certain of our business affiliates who have expressed a general willingness to review your information and determine if they are willing to provide you with the services or products that prompted you to visit our Site. When you visit our Site, you will be requested to complete provide certain information that our business affiliates request in order to perform a preliminary analysis of your qualifications to receive the service or products. Based upon your consent, as evidenced by your registering with us on this Site (i.e., your submission of the requested information on the application), we will forward the information that you provided to certain of our business affiliates.
   
   In addition, from time to time, we or our business affiliates may provide you the additional service (the "Premium Service") of sending you e-mail you or otherwise corresponding with you to inform you of additional opportunities to receive special offers for other services and/or products that we believe may be of interest. There are no fees for Premium Service, and you are under no obligation to accept any service or product with any of our business affiliates offered under the Premium Service.
   
   <h3>Information We Collect</h3>
   The information that we collect is generally limited to personal information about you that our business affiliates consider necessary for performing a preliminary evaluation of your qualifications. To the extent that you can order products, enter contests, express an opinion, or subscribe to a service(s), the type of personally identifiable information that may be collected may include: name; address; e-mail address; telephone number; fax number; credit card information; information about your interests in and use of various products, programs, and services; education level; educational interests; home owner status; income; debt level; current mortgage; mortgage rate and the like. To the extent that you are requested and you do submit information about other people, such information will be limited recipient's name, address, e-mail address, and telephone number.
   
   We also collect user information that can help us optimize and enhance your experience on our Site; as well as provide you with an efficient, safe, smooth, and customized experience. For example, if you came to this Site from an online banner ad, pop-up or other advertisement, an anonymous identification number may be passed to our Site. In some cases, we may place a cookie in your browser. The aforementioned information cannot, by itself, be used to gather any personally identifiable information about you, but it will allow us to track the overall effectiveness of our online advertising campaigns. We also automatically track certain information with respect to your behavior on the Site through the forgoing cookie or identification number. This non personally identifiable information may include the Internet address or URL that you just came from and which URL you go to next; your computer browser information; and your IP address. We use this non personally identifiable information in conjunction with some of the information that you provided to us to do internal research on our users' demographics and behavior; and to better understand how to best serve other users of this Site. Third parties may also set cookies on our sites to determine proper site usage and click count.
   
   We also utilize Web Logs to track aggregate information about how our site is being used. Web Logs track anonymous user information, including but not limited to the number of visitors to our site, operating systems and browser type. Unlike cookies, Web Logs are maintained only on our servers and do not store or place anything on the user's computer.
   
   <h3>How We Use Your Information</h3>
   We collect the information that you submit and which our business affiliates consider necessary for performing a preliminary evaluation of your qualifications for their products and services. Prior to sending your information to our business affiliates, we attempt to validate it. For example, we may compare and review your personal information for errors, omissions, and accuracy based upon past usage and response; or compare your information against other publicly available files; or validate some of the personal information submitted to verify that the information inputted has a high probability of being valid information.
   
   After we submit your information to our business affiliates, our business affiliates may begin a separate and independent evaluation of the information you submitted (the "Preliminary Application"). If our business affiliates find that the Preliminary Application meets with their more specific acceptance criterion, they may contact you directly by phone, mail or e-mail. For more information on how our business affiliates will handle your personal information, please visit our business affiliate's website, and review their privacy policy. We are not responsible for the privacy practices or the content of our business affiliates' Web sites.
   
   Once you have registered with us, you are automatically enrolled to receive our Premium Service. We use the information you provided, along with other information described below, to create a general user profile. This profile can be created by combining your information with other sources of information such as information obtained from public databases, or from your browsing habits surrounding your visit to this Site.
   
   We may use personal information to provide the services you've requested, including wireless services that display customized content and advertising. In addition to any fee of which you are notified, your provider's standard messaging rates apply to our confirmation and all subsequent SMS correspondence. You may opt-out and remove your SMS information by sending "STOP", "END", "QUIT" to the SMS text message you have received. If you remove your SMS information from our database it will no longer be used by us for secondary purposes, disclosed to third parties, or used by us or third parties to send promotional correspondence to you.
   
   <h3>The Do Not Track browser settings</h3>
   Advertisers may collect data about your online browsing activity and use it to show you targeted ads (a process known as "behavioral advertising”).
   
   You can prevent companies from showing you targeted ads by submitting opt-outs to those service providers.
   
   Opting-out will only prevent targeted ads so you may continue to see generic (non-targeted ads) from these companies after you opt-out.
   
   <h3>WE MAY USE INFORMATION THAT WE HAVE COLLECTED FOR ANY LEGALLY PERMISSIBLE PURPOSE, INCLUDING SELLING OR TRANSFERING SUCH INFORMATION AT ANY TIME TO THIRD PARTIES FOR ANY LEGALLY PERMISSIBLE PURPOSE.</h3>
   For example, we may share your personal information with select business affiliates so that they can contact you and offer you products and or services that we believe might be of interest to you. This may include e-mail advertising, telephone marketing, direct mail marketing, and online banner advertising to name a few. In addition, we may maintain separate e-mail, mailing or phone lists for different purposes based on the information that you submitted and that we maintain. For your information, our business affiliates have all agreed to operate in accordance with federal and state laws and regulations relating to the handling of your personal information. You may learn more about any of our business affiliate's privacy policy by visiting our business affiliates' Web sites at such times as such affiliate may contact you. We are not responsible for the privacy practices or the content of our business affiliates' Web sites. If you wish to end any e-mail correspondence from us, you will need to Opt-out from receiving further correspondence by advising us of your decision to Opt-out by clicking a link in the e-mail to our Opt-out procedures. Within ten (10) business days, your e-mail address will be placed on a suppression list and we will no longer correspond with you by email or resell or transfer your information to third parties. If you wish to end future correspondence with any of our business affiliates, you will need to follow the instructions at the end of any such each e-mail message from them to unsubscribe from such business affiliate's e-mail. You are able to opt-out when registering with us.
   
   We may also disclose your personally identifiable information in response to a subpoena, court order, or other legal process; as well as the transfer or sale of personally identifiable information pursuant to the sale of our business or assets. Should such a combination or acquisition occur, we will require that the new combined or acquiring entity follow this privacy policy with respect to your personal information. If we transfer ownership of the site to another company, we will notify you by email or by general notice on our site. In addition to the forgoing, we may also sell, transfer or share non-individualized information, such as summary or aggregated anonymous information about all persons or sub-groups of persons visiting this site.
   
   We cannot ensure that all of your private communications and other personal information will never be disclosed in ways not otherwise described in this Privacy Policy. For example, third parties may unlawfully intercept personal data or access our servers and obtain personal data. Therefore, although we use industry standard practices to protect your privacy, we do not promise, nor you should not expect, that your personal information would always remain private.
   
   Certain sensitive information such as credit card numbers or other information such as social security numbers and drivers licenses ("Financial Information") collected on the site and associated data is encrypted and protected with SSL encryption software from the time it is captured by our application to the time it is transmitted to our servers. For more information on the encryption and protection of your information, please see How We Protect Your Privacy.
   
   <h3>Application of this Privacy Policy</h3>
   This Privacy Policy applies to consumers that have signed up on the website. We may sell the personal information that you supply to us and we may work with other third party businesses to bring selected retail opportunities to our members via direct mail, email and telemarketing. These businesses may include providers of direct marketing services and applications, including lookup and reference, data enhancement, suppression and validation and email marketing
   
   <h3>How We Protect Your Privacy</h3>
   We protect your privacy in a number of ways. As an initial matter, any Financial Information transmitted to our servers via a secure server is encrypted using SSL technology. SSL is a protocol that transmits your communications over the Internet in an encrypted form. The protocol ensures that the information is sent, unchanged, only to the server you intended to send it to.
   
   Once your information reaches our server, it is protected by a firewall. With a firewall in place, your information is virtually inaccessible to third parties. In addition to encryption and firewall protections, we have all of our business affiliates agree to operate in accordance with federal and state laws and regulations, including regulations relating to CAN-SPAM and rules promulgated by the FTC. If we learn that any of our business affiliates are breaching our agreement, and therefore your trust, we will take corrective actions immediately or terminate our relationship with such business affiliate.
   
   We follow generally accepted industry standards to protect the personal information submitted to us, both during transmission and once we receive it. No method of transmission over the Internet, or method of electronic storage, is 100% secure, however. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. If you have any questions about security on our Web site, you can mail us at the address indicated below in the Contact Us section.
   
   <h3>Changes; Opting-Out</h3>
   If you want to change the information that you submitted, please do so by making another request through our Site. We will not be able to change information that is forwarded on to our business affiliates. Please contact the business affiliates directly to change any of your information.
   
   If you want to request to be removed from further communication with this Site, including our Premium Services, please Opt-out by clicking on this link to our Opt-out procedure. We will place your e-mail address on a suppression file associated with this Site. Persons whose names appear on our suppression file, will have their e-mail addresses checked against all correspondence to be sent by us. Where there is a match, the planned email correspondence will be withheld, and such person will receive no further email correspondence from us. Your e-mail address will be placed on the suppression list associated with this Site within ten business (10) days of your request. Once you have opted out, we will no longer forward you email from this site but we are not responsible or in control of the business practices of our business affiliates who have been forwarded your information.
   
   <h3>Notification of Changes to Privacy Policy</h3>
   We may update this Privacy Policy at any time by posting a new privacy policy on the Site. Be sure to check the current terms of any privacy policy in effect by visiting this Site. By checking the effective date of the policy, you will be immediately alerted on whether the Privacy Policy has been updated. Please note however, that the updated privacy policy will go into effect automatically 30 days after initial posting. From time to time, we may use your information for new, unanticipated uses not previously disclosed in our Privacy Policy. Please note that if our information practices change at some time in the future, we will use only data collected from the time of the new privacy policy amendment forward for those new purposes. If we make material changes to this policy, we will notify you here, by email, or by means of a notice on our home page.
   
   <h3>Contact Us</h3>
   If you have any questions or suggestions regarding our privacy policy, please contact us at:
   
   ATTN: harpreplacement.com
   909 N. Pacific Coast Highway
   Suite 300
   El Segundo, CA 90245
   <h3>Special Notification for California Residents</h3>
   Individual customers who reside in California and have provided their personal information may request information regarding disclosures of this information to third parties for direct marketing purposes. Such requests must be submitted to us at the following mailing address:
   
   ATTN: harpreplacement.com
   909 N. Pacific Coast Highway
   Suite 300
   El Segundo, CA 90245
   This request may be made no more than once per calendar year. We reserve our right not to respond to requests submitted other than to the address specified in this paragraph.</p>`

   const license = `<h1>LICENSES & DISCLOSURES</h1>
   <p>This site is operated by The Wisdom Companies, LLC. a California Limited Liability Company with its corporate headquarters in El Segundo, California ("Wisdom"). Wisdom operates personal finance websites designed to help users to get in touch with licensed mortgage brokers, licensed mortgage lenders, banks and other providers of financial services (collectively, “service providers”).
   
   <p>Consumers should rely on their own judgment in deciding which available loan product best suits their needs and financial means. Consumers are not charged a fee to use Wisdom services and are under no obligation to use Wisdom to commence the financing process and Wisdom does not guarantee that completing a loan quote request will result in your receiving a loan from a service providers. Wisdom receives its compensation from the service providers for the goods, facilities and services actually provided by Wisdom.</p>
   
   <p>Wisdom does not endorse, warrant or guarantee service or products of any service provider and does not guarantee and makes no representation regarding any rates, points and loan programs offered or advertised by service providers. All information is subject to change without notice. Wisdom shall not be responsible or liable for any products, services, information or other materials displayed, purchased, or obtained by consumers from our service providers, including, without limitation, any agent referrals, loan recommendations, application, approval, pre-qualification, loan or interest rate analysis. Nothing on this web site contains an offer, promise or otherwise, either to make a specific loan or that any participating lender or broker will make any loan for any purpose or on any specific terms.</p>
   
   <p>The loan quote request a consumer submits is NOT an application for credit. Rather, it is a request for a loan quotation.</p>
   
   <p>The Wisdom Companies, LLC currently holds the following state licenses:</p>
   
   <p>In order to provide our services, some states may require Wisdom to be licensed as a mortgage broker. Please note that while certain states require at minimum one individual to be licensed as a mortgage loan originator, we neither originate loans nor employ loan originators.</p>
   
   <p>Our NMLS ID Number is 1863</p>
   
   <p>Alabama</p>
   Alabama Mortgage Broker's License Number 22099
   
   <p>Arizona</p>
   Mortgage Broker's License Number MB-0908386;<br>
   Branch License No. MBBR-0112004
   
   <p>Arkansas</p>
   The Wisdom Companies, LLC is a licensed Arkansas Mortgage Loan Company/Broker.<br>
   License No. 117007
   
   <p>California</p>
   FINANCE LENDER LICENSE 603D002
   
   <p>CALIFORNIA HOLDEN ACT - FAIR LENDING NOTICE</p>
   
   <p>THE HOUSING FINANCIAL DISCRIMINATION (HOLDEN) ACT OF 1977 -- FAIR LENDING NOTICE IT IS ILLEGAL TO DISCRIMINATE IN THE PROVISION OF OR IN THE AVAILABILITY OF FINANCIAL ASSISTANCE BECAUSE OF THE CONSIDERATION OF: (i) TRENDS, CHARACTERISTICS OR CONDITIONS IN THE NEIGHBORHOOD OF GEOGRAPHIC AREA SURROUNDING A HOUSING ACCOMODATION, UNLESS THE FINANCIAL INSTITUTION CAN DEMONSTRATE IN THE PARTICULAR CASE THAT SUCH CONSIDERATION IS REQUIRED TO AVOID AN UNSAFE AND UNSOUND BUSINESS; OR (ii) RACE, COLOR, RELIGION, SEX, MARITAL STATUS, NATIONAL ORIGIN OR ANCESTRY. IT IS ILLEGAL TO CONSIDER THE RACIAL, ETHNIC, RELIGIOUS OR NATIONAL ORIGIN COMPOSITION OF A NEIGHBORHOOD OR GEOGRAPHICAL AREA SURROUNDING A HOUSING ACCOMMODATION OR WHETHER OR NOT SUCH COMPOSITION IS UNDERGOING CHANGE, OR IS EXPECTED TO UNDERGO CHANGE, IN APPRAISING A HOUSING ACCOMMODATION OR IN DETERMINING WHETHER OR NOT, OR UNDER WHAT TERMS AND CONDITIONS, TO PROVIDE FINANCIAL ASSISTANCE. THESE PROVISIONS GOVERN FINANCIAL ASSISTANCE FOR THE PURPOSE OF THE PURCHASE, CONSTRUCTION, REHABILITATION OR REFINANCING OF ONE-TO-FOUR UNIT FAMILY RESIDENCES OCCUPIED BY THE OWNER AND FOR THE PURPOSE OF THE HOME IMPROVEMENT OF ANY ONE-TO-FOUR UNIT FAMILY RESIDENCE. IF YOU HAVE QUESTIONS ABOUT YOUR RIGHTS, OR IF YOU WISH TO FILE A COMPLAINT, CONTACT THE DEPARTMENT OF REAL ESTATE 2201 BROADWAY P.O. BOX 187000 SACRAMENTO, CA 95808-7000</p>
   
   <p>The Wisdom Companies, LLC is a MORTGAGE BROKER ONLY, NOT A MORTGAGE LENDER OR MORTGAGE CORRESPONDENT LENDER.</p>
   
   <p>Connecticut</p>
   Connecticut Mortgage Broker License No. MB-1863
   
   <p>Delaware</p>
   Mortgage Loan Broker License Number 20503
   
   <p>Florida</p>
   The Wisdom Companies, LLC, Florida Correspondent Mortgage Lender.<br>
   License No. MBR3109
   
   <p>This disclosure is written to give you notice that The Wisdom Companies, LLC does not originate mortgage loans or commitments. Although The Wisdom Companies will forward your loan request to its participating lenders, The Wisdom Companies does not guarantee acceptance into any particular loan program. Should you choose to apply for a mortgage loan with a participating lender, that lender will provide you with a Good Faith Estimate itemizing fees, including loan origination and/or other settlement service fees. The documentation you receive will also include information on whether any fees paid are refundable.</p>
   
   <p>YOU ARE NOT REQUIRED TO PURCHASE ADDITIONAL PRODUCTS OR SERVICES FROM LMB OR FROM ANY PERSON OR ENTITY SUGGESTED OR RECOMMENDED BY THE WISDOM COMPANIES. HOWEVER, THE WISDOM COMPANIES RESERVES THE RIGHT TO APPROVE THE ENTITY SELECTED BY YOU, WHICH APPROVAL MAY NOT BE UNREASONABLY WITHHELD. A LENDER IS ALLOWED TO REQUIRE THE USE OF AN ATTORNEY, CREDIT REPORTING AGENCY OR REAL ESTATE APPRAISER CHOSEN TO REPRESENT THE LENDER’S INTEREST.</p>
   
   <p>Indiana</p>
   Indiana-SOS Loan Broker License No. 1863
   
   <p>Iowa</p>
   
   <p>Mortgage Broker License Number 2015-0091</p>
   
   <p>Louisiana</p>
   
   <p>Louisiana Residential Mortgage Lending License.</p>
   
   <p>Maine</p>
   Loan Broker License Number: 1863
   
   <p>Per Maine law, we are required to make the following disclosures. Do not sign a loan agreement before you read it. You are entitled to a copy of this agreement. We maintain records of your inquiry and advise you to print out a copy of this agreement for your own purposes.</p>
   
   <p>Written Agreement or Contract</p>
   Wisdom does not act as your lender or broker. Wisdom forwards your information to our participating Mortgage Originators who then contact you directly with their offers. Our services are provided free of cost to you and we do not charge or attempt to collect any fees from you. Additionally, Wisdom cannot guarantee the lowest price or best terms or rates available on the market. Our fees are flat and are collected from our partners, the amount from which is not dependent upon whether or not a loan is closed. This agreement remains in force only for as long as you use the services offered by Wisdom. Should you discontinue this relationship, you will not incur any cost or penalty.
   
   <p>Escrowing of Consumer Funds</p>
   Wisdom does not collect fees or any money from the consumer, thus, no escrow account is required.
   
   <p>Consumer Protection Bond</p>
   A surety bond in the amount of $25,000 is on file with the Office of Consumer Credit Regulation in the State of Maine. This bond acts as consumer protection for any person or persons who may have a cause of action against a loan broker. If you have a claim against our company which cannot be resolved through informal means, you may institute an action to recover your loss from that bond by filing a written complaint with the Director, Office of Consumer Credit Regulation, 35 State House Station, Augusta, Maine 04333-0035.
   
   <p>Massachusetts</p>
   Massachusetts Mortgage Broker License
   The Wisdom Companies, LLC<br>
   Mortgage Broker License #MB1863
   
   <p>North Dakota</p>
   Money Broker License Number MB102855
   
   <p>Ohio</p>
   Ohio Residential Mortgage Lending Act Certificate of Registration No. RM.804334.000
   
   <p>Oklahoma</p>
   Mortgage Broker License Number MB010611
   
   <p>Pennsylvania</p>
   The Wisdom Companies, LLC
   Licensed by the Pennsylvania Department of Banking<br>
   Mortgage Broker License No. 71102<br>
   If you choose to transact with a Lender, you may be required by the Lender to pay an application fee to cover the costs of an appraisal, credit report or other items. The Lender determines the fee amount. Your loan documents will disclose whether these fees are refundable or nonrefundable.
   Texas<br>
   Wisdom Companies, LLC<br>
   NMLS ID 1863 – has been issued a mortgage company license by the Texas Department of Savings and Mortgage Lending.
   
   <p>CONSUMERS WISHING TO FILE A COMPLAINT AGAINST A MORTGAGE LOAN COMPANY OR A RESIDENTIAL MORTGAGE LOAN ORIGINATOR SHOULD COMPLETE AND SEND A COMPLAINT FORM TO THE TEXAS DEPARTMENT OF SAVINGS AND MORTGAGE LENDING, 2601 NORTH LAMAR, SUITE 201, AUSTIN, TEXAS 78705. COMPLAINT FORMS AND INSTRUCTIONS MAY BE OBTAINED FROM THE DEPARTMENT’S WEBSITE AT WWW.SML.TEXAS.GOV. A TOLL-FREE CONSUMER HOTLINE IS AVAILABLE AT 1-877-276-5550.</p>
   
   <p>THE TEXAS DEPARTMENT OF SAVINGS AND MORTGAGE LENDING MAINTAINS A RECOVERY FUND TO MAKE PAYMENTS OF CERTAIN ACTUAL OUT OF POCKET DAMAGES SUSTAINED BY BORROWERS CAUSED BY ACTS OF LICENSED RESIDENTIAL MORTGAGE LOAN ORIGINATORS. A WRITTEN APPLICATION FOR REIMBURSEMENT FROM THE RECOVERY FUND MUST BE FILED WITH AND INVESTIGATED BY THE DEPARTMENT PRIOR TO THE PAYMENT OF A CLAIM. FOR MORE INFORMATION ABOUT THE RECOVERY FUND, PLEASE CONSULT THE DEPARTMENT’S WEBSITE AT WWW.SML.TEXAS.GOV.</p>
   
   <p>Virginia</p>
   Mortgage Broker License Number MC-5945
   
   <p>Wyoming</p>
   Mortgage Broker License Number 2738
   
   <p>The Wisdom Companies, LLC has received Mortgage Broker License exemptions in the following states:</p>
   Kentucky
   
   <p>The Wisdom Companies, LLC</p>
   909 N. Pacific Coast Highway<br />
   Suite 210<br />
   El Segundo, CA 90245</p>`

})