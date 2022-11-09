// import * as React from 'react';
// import { localeEN } from '../../locales/localeEN';
// import './signUp.css';
//
// type Props = {
//   switchForm: (isClick: boolean) => void;
// };
//
// export const SignUp = ({ switchForm }: Props) => {
//   function handleSwitch(e: React.FormEvent) {
//     e.preventDefault();
//     switchForm(true);
//   }
//
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//   };
//
//   return (
//     <form className="sign-up-form" onSubmit={handleSubmit}>
//       <p className="">{localeEN.FORM_TITLE_REGISTRATION}</p>
//       <div className="">
//         <label htmlFor="username">Name</label>
//         <input type="text" id="username" required />
//       </div>
//       <div className="">
//         <label htmlFor="login">Login</label>
//         <input type="text" id="login" required />
//       </div>
//       <div className="">
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" required />
//       </div>
//       <div className="">
//         <a href="/" className="" onClick={handleSwitch}>
//           {localeEN.FORM_LINK_LOGIN}
//         </a>
//         <button type="submit" className="">
//           {localeEN.FORM_BUTTON_REGISTRATION}
//         </button>
//       </div>
//     </form>
//   );
// };
export default {}