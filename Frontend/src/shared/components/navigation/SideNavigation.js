



// const SideNavigation = (props) => {
//   const auth = useContext(AuthContext);
//   const content = <aside className="side-nav">{props.children}</aside>;
//   const { classes } = this.props;
//   state = { drawerIsOpen: false }
//   handleDrawerOpen = () => {
//     this.setState({ drawerIsOpen: true });
//   };
  
//   return (
//     <>
//       <Drawer
//         variant="persistent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         open={this.state.drawerIsOpen}
//       >
//         <div className={classes.drawerHeader}>
//           <IconButton onClick={this.handleDrawerClose}>
//             {/* <ChevronLeftIcon /> */}
//           </IconButton>
//         </div>
//         <div className={classes.drawerInner}>
//           <p>drawer content</p>
//         </div>
//       </Drawer>

//       <div id="mySidenav" className="sidenav">
//         <ul>
//           <li>
//             <NavLink to="/dashboard">My Dashboard</NavLink>
//           </li>
//           <li className="injury">
//             <NavLink to={"/wounds/new"}>New Injury</NavLink>
//           </li>
//           <li className="treatment">
//             <NavLink to={`/${auth.userId}/wounds`}>Treatments</NavLink>
//             <ul>
//               <li className="treatment">
//                 <NavLink to={`/${auth.userId}/treatments`}>
//                   My Treatments
//                 </NavLink>
//               </li>
//               <li className="treatment">
//                 <NavLink to={`/${auth.userId}/treatments/history`}>
//                   History
//                 </NavLink>
//               </li>
//             </ul>
//           </li>

//           <li className="prescriptions">
//             <NavLink to="/prescriptions">Prescriptions</NavLink>
//             <ul>
//               <li className="prescriptions">
//                 <NavLink to={`/${auth.userId}/prescriptions`}>
//                   My Prescriptions
//                 </NavLink>
//               </li>
//               <li className="prescriptions">
//                 <NavLink to={`/${auth.userId}/prescriptions/history`}>
//                   History
//                 </NavLink>
//               </li>
//             </ul>
//           </li>
//           <li className="messages">
//             <NavLink to="/messages">Messages</NavLink>
//             <ul>
//               <li className="messages">
//                 <NavLink to={`/${auth.userId}/messages/new`}>
//                   New Message
//                 </NavLink>
//               </li>
//               <li className="messages">
//                 <NavLink to={`/${auth.userId}/messages`}>Messages</NavLink>
//               </li>
//             </ul>
//           </li>
//           <li className="picture-upload">
//             <NavLink to="/pictures">Upload a Picture</NavLink>
//           </li>
//         </ul>
//       </div>
//       <span onclick="openNav()">open</span>
//     </>
//   );
// };

// export default SideNavigation;
