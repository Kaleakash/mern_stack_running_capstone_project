import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeCustomerPassword, depositeAmount, findAllCustomer, findCustomer, withDrawAmount } from "../slice/customerSlice";
import { findTransaction, transactionStore } from "../slice/transactionSlice";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { ToastContainer, toast } from 'react-toastify';

function CustomerPage() {
let [customer,setCustomer]=useState({});
let [account,setAccount]=useState({});
let [customerTransaction,setCustomerTransaction]=useState([{}]);
let dispatch = useDispatch();
let [contactForm,setContactForm]=useState({});
let [userPasswordReset,setUserPasswordReset]=useState({"oldPassword":"","newPassword":"","repeatNewPassword":""});
let navigate = useNavigate();

useEffect(()=> {
    AOS.init();
    AOS.refresh();
let obj = sessionStorage.getItem("user");
if(obj!=null){
        let emailid = obj;
        const initializationDetails = async ()=> {
            let customerInfo  = await dispatch(findAllCustomer()); 
            console.log(customerInfo);
            let customerResult = customerInfo.payload.find(c=>c.emailid==emailid);

            let transactionInfo = await dispatch(findTransaction());
            let transactionDetails  = transactionInfo.payload.filter(e=>e.accno==customerResult.accno);
            console.log("all Transaction details");
            //console.log(transactionDetails);
            setCustomerTransaction(transactionDetails);
            setCustomer(customerResult);
            setAccount(account=> {
                return {...account,"accno":customerResult.accno}
            });
        }
        initializationDetails();
    }

    const loadAllTransaction= async()=> {
        console.log(customer)
        
    }
    loadAllTransaction();
 
},[account.amount]);


const logout = (event)=> {
    navigate("/");
}

const contactUs= (event)=> {
    event.preventDefault();

}

const changePassword= async (event)=> {
  event.preventDefault();
    console.log(userPasswordReset);
    console.log(customer);
    if(userPasswordReset.oldPassword.length==0){
      alert("Plz enter old password")
    }else if (userPasswordReset.newPassword.length==0 || userPasswordReset.repeatNewPassword.length==0) {
        alert("Plz enter new password")
    }else if(customer.password!=userPasswordReset.oldPassword){
      alert("Old password is not correct")
    }else if(userPasswordReset.newPassword!=userPasswordReset.repeatNewPassword) {
        alert("New Password and Repeat password not match");
    }else {
      let tempCustomer = {...customer};
      tempCustomer.password=userPasswordReset.newPassword;
      let passwordChangeResult = await dispatch(changeCustomerPassword(tempCustomer));
      if(passwordChangeResult.payload!=undefined){
        alert("password updated successfully")
      }
      setUserPasswordReset({oldPassword:"",newPassword:"",repeatNewPassword:""});
    }
    
}

const transfer = async (event)=> {
    event.preventDefault();
    console.log(account);
    let transferCutomerResult = await dispatch(findAllCustomer());
    console.log(transferCutomerResult.payload);
    let toCustTemp = transferCutomerResult.payload.find(c=>c.accno==eval(account.transferTo));
    console.log(toCustTemp)
    if(toCustTemp!=undefined){
        console.log("yes")
        
        let fromCustTemp = {...customer};
        console.log(fromCustTemp);
        console.log(toCustTemp)

        fromCustTemp.amount=fromCustTemp.amount-account.amount;    
        let withdranResult = await dispatch(withDrawAmount(fromCustTemp));
        console.log(withdranResult);
        setCustomer(withdranResult.payload);

        setAccount(account=> {
          return {...account,"amount":"","transferTo":""}
        })
  
        let transactionObj = {};
        transactionObj.cid = customer.cid;
        transactionObj.cname = customer.cname;
        transactionObj.emailid = customer.emailid;
        transactionObj.accno= customer.accno;
        transactionObj.amount = account.amount;
        transactionObj.typeoftransaction="Transfer";
        transactionObj.dot=new Date().toISOString().slice(0, 19);
        transactionObj.transferTo=toCustTemp.accno;
        console.log("Transaction details");
        console.log(transactionObj);

        let transactionResult = await dispatch(transactionStore(transactionObj));
        console.log(transactionResult);

        let toCustTempObj = {...toCustTemp};
        toCustTempObj.amount=toCustTempObj.amount+account.amount;
        console.log("after deposite")
        console.log(toCustTempObj)
        // console.log(customer);
        let depositeResult = await dispatch(depositeAmount(toCustTempObj));      
        console.log(depositeResult) 
        alert("amount transfered successfully"); 
    }else {
      alert("To Account number is wrong! we can't transfer");
    }
}

const withdraw= async (event)=> {
    event.preventDefault();
    console.log(account);
    console.log(customer)
    let custTemp = {...customer};
    console.log("before deposite")
    console.log(custTemp);
    custTemp.amount=custTemp.amount-account.amount;
    console.log("after deposite")
    console.log(custTemp)
   // console.log(customer);
   let withdranResult = await dispatch(withDrawAmount(custTemp));
   console.log(withdranResult);
   setCustomer(withdranResult.payload);

   setAccount(account=> {
    return {...account,"amount":0}
  })
  let transactionObj = {};
  transactionObj.cid = customer.cid;
  transactionObj.cname = customer.cname;
  transactionObj.emailid = customer.emailid;
  transactionObj.accno= customer.accno;
  transactionObj.amount = account.amount;
  transactionObj.typeoftransaction="Withdrawn";
  transactionObj.dot=new Date().toISOString().slice(0, 19);
  transactionObj.transferTo=0;
  console.log("Transaction details");
  console.log(transactionObj);
  let transactionResult = await dispatch(transactionStore(transactionObj));
  console.log(transactionResult);
  alert("Amount withdraw successfully")
}

const deposite = async (event)=> {
    event.preventDefault();
    console.log(account);
    console.log(customer)
    let custTemp = {...customer};
    console.log("before deposite")
    console.log(custTemp);
    custTemp.amount=custTemp.amount+account.amount;
    console.log("after deposite")
    console.log(custTemp)
   // console.log(customer);
   let depositeResult = await dispatch(depositeAmount(custTemp));
   console.log(depositeResult);
   setCustomer(depositeResult.payload);

   setAccount(account=> {
    return {...account,"amount":0}
  })
  let transactionObj = {};
  transactionObj.cid = customer.cid;
  transactionObj.cname = customer.cname;
  transactionObj.emailid = customer.emailid;
  transactionObj.accno= customer.accno;
  transactionObj.amount = account.amount;
  transactionObj.typeoftransaction="Deposit";
  transactionObj.dot=new Date().toISOString().slice(0, 19);
  transactionObj.transferTo=0;
  console.log("Transaction details");
  console.log(transactionObj);
  let transactionResult = await dispatch(transactionStore(transactionObj));
  console.log(transactionResult);
  alert("Amount deposite successfully")
}
    return(
        <div>
            <div id="overlayer"></div>
            <div className="loader">
                <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>


            <div className="site-wrap">

<div className="site-mobile-menu site-navbar-target">
  <div className="site-mobile-menu-header">
    <div className="site-mobile-menu-close mt-3">
      <span className="icon-close2 js-menu-toggle"></span>
    </div>
  </div>
  <div className="site-mobile-menu-body"></div>
</div>


</div>



<header className="site-navbar js-sticky-header site-navbar-target" role="banner">
      <h1 align="center">Welcome user <span className="text-primary" id="user">{customer.cname}</span> to Home Page</h1>
    <div className="container">
      <div className="row align-items-center">
          
        <div className="col-12 col-md-10 d-none d-xl-block">
          <nav className="site-navigation position-relative text-right" role="navigation">

            <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
              <li><a href="#view-account-details" className="nav-link">View Account</a></li>
              <li><a href="#transfer-amount" className="nav-link">Transfer Amount</a></li>
              <li><a href="#withdraw-amount" className="nav-link">Withdraw</a></li>
              <li><a href="#deposit-amount" className="nav-link">Deposit</a></li>
              <li><a href="#view-transaction" className="nav-link">View Transaction</a></li>
              <li><a href="#change-password-section" className="nav-link">Change Password</a></li>
              <li><a href="#contact-section" className="nav-link">Request</a></li>
              <li><a onClick={logout}>Logout</a></li>
            </ul>
          </nav>
        </div>


        <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{"position": "relative", "top": "3px"}}><a href="#" className="site-menu-toggle js-menu-toggle float-right"><span className="icon-menu h3"></span></a></div>

      </div>
    </div>
    
  </header>


  <div className="site-blocks-cover overlay" style={{"backgroundImage": "url(./images/hero_2.jpg)"}} data-aos="fade" id="home-section">
  
  </div>



  <section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="view-account-details">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">View Account Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/accountdetails.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <h3 className="text-black mb-4">Your Account Details is </h3>
          <p>Customer Id is    : {customer.cid} </p>
          <p>Customer Name     : {customer.cname} </p>
          <p>Account Number is : {customer.accno} </p>
          <p>Balance amount is : {customer.amount}</p>           
        </div>
      </div>        
    </div>  
  </div>
</section>



<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="transfer-amount">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Trasfer amount</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/transferamount.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <form style={{"margin-top": "0px"}} onSubmit={transfer}>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fromaccount" 
              placeholder="From account number" readonly value={customer.accno}
              name="accno"
              />
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="toaccount" placeholder="To account number" 
              name="transferTo" value={account.transferTo}
              onChange={(event)=> {
                setAccount(account=> {
                    return {...account,"transferTo":event.target.value}
                })
              }}
              />
              <label for="floatingPassword">To Account Number</label>
            </div>


            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="amount" placeholder="Send amount" 
              name="amount" value={account.amount}
              onChange={(event)=> {
                setAccount(account=> {
                    return {...account,"amount":eval(event.target.value)}
                })
              }}
               />
              <label for="floatingPassword">Amount</label>
            </div>


            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Transfer</button>   
            </div>
          </form>         
        </div>
      </div>        
    </div>  
  </div>
</section>



<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="withdraw-amount">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Withdraw Amount</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/withdraw.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <form style={{"margin-top": "0px"}}  onSubmit={withdraw}>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fromaccount" placeholder="From account number" 
              readonly value={customer.accno} name="accno"
              />
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="amount" placeholder="Amount to withdraw" name="amount"
              value={account.amount}
              onChange={(event)=> {
                setAccount(account=> {
                    return {...account,"amount":eval(event.target.value)}
                })
              }}
              />
              <label for="floatingInput">Amount</label>
            </div>


            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Withdraw</button>   
            </div>
          </form>         
        </div>
      </div>        
    </div>  
  </div>
</section>




<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="deposit-amount">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">Deposit Amount</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/deposit.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <form style={{"marginTop": "0px"}} onSubmit={deposite}>
            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="fromaccount" 
              placeholder="From account number" readonly value={customer.accno}
              name="accno"/>
              <label for="floatingInput">From Account Number</label>
            </div>

            <div className="form-floating mb-3">
              <input type="number" className="form-control" id="amount" placeholder="Amount to Deposit" name="amount"
              value={account.amount}
              onChange={(event)=> {
                setAccount(account=> {
                    return {...account,"amount":eval(event.target.value)}
                })
              }}
              />
              <label for="floatingInput">Amount</label>

            </div>


            <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Deposit Amount</button>   
            </div>
          </form>         
        </div>
      </div>        
    </div>  
  </div>
</section>


<section className="site-section border-bottom">
  <div className="site-section cta-big-image" id="view-transaction">
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="section-title mb-3" data-aos="fade-up" data-aos-delay="">View Transaction Details</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 mb-5" data-aos="fade-up" data-aos-delay="">
          <figure className="circle-bg">
          <img src={require('../images/transactiondetails.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
          </figure>
        </div>
        <div className="col-lg-8 ml-auto" data-aos="fade-up" data-aos-delay="100">
          
          <table className="table table-striped">
            <tr>
              <th>SrNo</th>
              <th>From Account</th>
              <th>TypeOfTransaction</th>
              <th>Amount</th>
              <th>Date Of Transaction</th>
              <th>To Account</th>
            </tr>
            {customerTransaction.map((ct,i)=>
                <tr>
                    <td>{i+1}</td>
                    <td>{ct.accno}</td>
                    <td>{ct.typeoftransaction}</td>
                    <td>{ct.amount}</td>
                    <td>{ct.dot}</td>
                    <td>{ct.transferTo==0?<span>No Transfer</span>:<span>{ct.transferTo}</span>}</td>
                </tr>
            )
        }
        </table>   
        </div>
      </div>        
    </div>  
  </div>
</section>



<section className="site-section bg-light" id="change-password-section" data-aos="fade">
  <div className="container">
    <div className="row mb-5">
      <div className="col-12 text-center">
        <h2 className="section-title mb-3">Password Change</h2>
      </div>
    </div>  
    <div className="row">
      <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="">
        <figure className="circle-bg">
          <img src={require('../images/login.jpg')} alt="Free Website Template by Free-Template.co" className="img-fluid"/>
        </figure>
    </div>

      <div className="col-lg-6 mb-5">

        

        <div className="col-lg-6 mb-5" data-aos="fade-up" data-aos-delay="100">
          <form style={{"marginTop": "0px"}} onSubmit={changePassword}>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="oldpassword" 
              placeholder="Old Password" name="oldPassword"
              value={userPasswordReset.oldPassword}
              onChange={(event)=> {
                setUserPasswordReset(user=> {
                    return {...user,"oldPassword":event.target.value}
                    }   
                )
              }}

              />
              <label for="floatingInput">Old Password</label>
              
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="newpassword" placeholder="New Password" 
              name="newPassword"
              value={userPasswordReset.newPassword}
              onChange={(event)=> {
                setUserPasswordReset(user=> {
                    return {...user,"newPassword":event.target.value}
                    }   
                )
              }}
              />
              <label for="floatingPassword">New Passowrd</label>
              
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="renewpassword" placeholder="Rewrite New Password" 
              name="repeatNewPassword"
              value={userPasswordReset.repeatNewPassword}
              onChange={(event)=> {
                setUserPasswordReset(user=> {
                    return {...user,"repeatNewPassword":event.target.value}
                    }   
                )
              }}
              />
              <label for="floatingPassword">Rewrite New Passowrd</label>
           
            </div>
              <div className="d-grid">
              <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Change Password</button>
              </div>
          </form>
        </div>
      
    </div>
  </div>
  </div>
</section>

<section className="site-section bg-light" id="contact-section" data-aos="fade">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-4 text-center">
          <p className="mb-4">
            <span className="icon-room d-block h2 text-primary"></span>
            <span>Address: NALANDA 53/1 C, Manoj Arcade, 24th Main Rd, Sector 2, HSR Layout, Bengaluru - 560102, Karnataka, India</span>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <p className="mb-4">
            <span className="icon-phone d-block h2 text-primary"></span>
            <a href="#">+1 232 3235 324</a>
          </p>
        </div>
        <div className="col-md-4 text-center">
          <p className="mb-0">
            <span className="icon-mail_outline d-block h2 text-primary"></span>
            <a href="#">youremail@domain.com</a>
          </p>
        </div>
      
      <div className="row">
        <div className="col-md-12 mb-5">
          <form action="#" className="p-5 bg-white" onSubmit={contactUs}>              
            <p className="h6 text-black mb-1">Contact Form</p> 
            <div className="row form-group">
              <div className="col-md-3">
                <label className="text-black" for="fname">First Name</label>
                <input type="text" id="fname" className="form-control" name="fname" 
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"fname":event.target.value}
                    })
                }}
                />
              </div>
              <div className="col-md-3">
                <label className="text-black" for="lname">Last Name</label>
                <input type="text" id="lname" className="form-control" name="lname"
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"lname":event.target.value}
                    })
                }}
                />
              </div>
              <div className="col-md-3">
                <label className="text-black" for="email">Email</label> 
                <input type="email" id="email" className="form-control"
                name="email"
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"email":event.target.value}
                    })
                }}
                />
              </div>
              
              <div className="col-md-3">
                <label className="text-black" for="subject">Subject</label> 
                <input type="subject" id="subject" className="form-control"
                name="subject"

                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"subject":event.target.value}
                    })
                }}

                />
              </div>     
            </div>

            <div className="row form-group">
              <div className="col-md-8 offset-2">
                <label className="text-black" for="message">Message</label> 
                <textarea name="message" id="message" cols="20" rows="5" className="form-control" 
                placeholder="Write your notes or questions here..."
                onChange={(event)=> {
                    setContactForm(contact=>{
                        return {...contact,"message":event.target.value}
                    })
                }}
                ></textarea>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <input type="submit" value="Send Message" className="btn btn-primary btn-md text-white"/>
              </div>
            </div>


          </form>
        </div>
      </div>  
      </div>
    </div>
  </section>


  <footer className="site-footer">
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-5">
              <h2 className="footer-heading mb-4">About Us...</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facere laudantium magnam voluptatum autem. Amet aliquid nesciunt veritatis aliquam.</p>
            </div>
            <div className="col-md-3 ml-auto">
              <h2 className="footer-heading mb-4">Quick Links</h2>
              <ul className="list-unstyled">
                <li><a href="#about-section" className="smoothscroll">Terms</a></li>
                <li><a href="#about-section" className="smoothscroll">Policy</a></li>
                <li><a href="#about-section" className="smoothscroll">About Us</a></li>
                <li><a href="#services-section" className="smoothscroll">Services</a></li>
                <li><a href="#testimonials-section" className="smoothscroll">Testimonials</a></li>
                <li><a href="#contact-section" className="smoothscroll">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3 footer-social">
              <h2 className="footer-heading mb-4">Follow Us</h2>
              <a href="#" className="pl-0 pr-3"><span className="icon-facebook"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-twitter"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-instagram"></span></a>
              <a href="#" className="pl-3 pr-3"><span className="icon-linkedin"></span></a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
          <form action="#" method="post" className="footer-subscribe">
            <div className="input-group mb-3">
              <input type="text" className="form-control border-secondary text-white bg-transparent" 
              placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2"/>
              <div className="input-group-append">
                <button className="btn btn-primary text-black" type="button" id="button-addon2">Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row pt-5 mt-5 text-center">
        <div className="col-md-12">
          <div className="border-top pt-5">
            <p className="copyright"><small>
          Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
            </small>    
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </footer>
  <ToastContainer />

        </div>
    )
}

export default CustomerPage;