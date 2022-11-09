// import * as React from 'react';
// import { localeEN } from '../../locales/localeEN';
// import './signIn.css';
//
// type Props = {
//   switchForm: (isClick: boolean) => void;
// };
//
// export const SignIn = ({ switchForm }: Props) => {
//   function handleSwitch(e: React.FormEvent) {
//     e.preventDefault();
//     switchForm(false);
//   }
//
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//   };
//
//   return (
//     <form className="sign-in-form" onSubmit={handleSubmit}>
//       <p className="">{localeEN.FORM_BUTTON_LOGIN}</p>
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
//           {localeEN.FORM_LINK_REGISTRATION}
//         </a>
//         <button type="submit" className="">
//           {localeEN.FORM_BUTTON_LOGIN}
//         </button>
//       </div>
//     </form>
//   );
// };
export default {}
