import { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { OneRelease } from "./Components/One-release/OneRelease";
import { MainStep } from "./Components/One-release/MainStep";
import { AllRelease } from "./Components/AllRelease/AllRelease";
import { AllTracks } from "./Components/AllTracks/AllTracks";
// import OverView from "./Components/OverView/OverView";
import DailyTreads from "./Components/DailyTreads/DailyTreads";
import Profile from "./Components/Profile/Profile";
import BankInformation from "./Components/BankInformation/BankInformation";
import Support from "./Components/Support/Support";
import Password from "./Components/Password/Password";
import UserMangement from "./Components/UserMangement/UserMangement";
import PaymentOperations from "./Components/PaymentOperations/PaymentOperations";
import FinancialReport from "./Components/FinancialReports/FinancialReports";
import UserAccessForm from "./Components/UserAccess/UserAccessForm";
import { AllDraft } from "./Components/AllDraft/AllDraft";
import { ReleaseDetails } from "./Components/AllRelease/ReleaseDetails";
import FinalSubmit from "./Components/One-release/FinalSubmit";
import EditUserPermission from "./Components/UserAccess/EditUserPermssion";
import UserAccess from "./Components/UserAccess/UserAccess";
import WithdrawRequest from "./Components/Withdraw Request/WithdrawRequest";
import AllTranscations from "./Components/AllTranscations/AllTranscations";
import Upload from "./Components/Upload/Upload";
import UserDetails from "./Components/UserMangement/UserDetails";
import { UserProfileProvider, useUserProfile } from "./Context/UserProfileContext";
import { getData } from './Services/Ops';
import { base } from './Constants/Data.constant';
// import Task from "./Components/Task/Task";
// import ClientList from "./Components/Task/client/clientList";
// import EmployeeList from "./Components/Task/employee/employeeList";
// import { LoginScreen } from "./Components/Task/LoginScreen";
import CompanyManagement from "./Components/CompanyMangement/CompanyMangement";
import AddCompany from "./Components/CompanyMangement/AddCompany";
import CompanyDetails from "./Components/CompanyMangement/CompanyDetails";
import { ForgetPassword } from './Components/Login/ForgetPassword';


function App() {
  const { userProfile, getPermissoin, getProfile } = useUserProfile()
  const [routeState, setRouteState] = useState(false)

  const adminRoute = () => {
    return <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/CompanyManagement" element={<CompanyManagement />}></Route>
      <Route path="/CompanyDetails" element={<CompanyDetails />}></Route>
      <Route path="All releases" element={<AllRelease />}></Route>
      <Route path="/all tracks" element={<AllTracks />}></Route>
      <Route path="/main-step" element={<MainStep />}></Route>

      {/* <Route path="/final-submit" element={<FinalSubmit />}></Route>
      <Route path="/All drafts" element={<AllDraft />}></Route>
     
      <Route path="/Daily Trends" element={<DailyTreads />}></Route> */}
      <Route path="/profile" element={<Profile />}></Route>
      {/* <Route path="/bank information" element={<BankInformation />}></Route>
      <Route path="/support" element={<Support />}></Route> */}
      {/* <Route path="/password change" element={<Password />}></Route> */}
      <Route path="/AddCompany" element={<AddCompany />}></Route>
      {/* <Route path="/User Mangement" element={<UserMangement />}></Route> */}
      {/* <Route path="/UserDetails" element={<UserDetails />}></Route> */}

      <Route path="/release-details" element={<ReleaseDetails />}></Route>
      {/* <Route path="/edit-permission" element={<EditUserPermission />}></Route> */}
      {/* <Route path="/Payment Operations" element={<PaymentOperations />}></Route>
      <Route path="/Financial Report" element={<FinancialReport />}></Route>
      <Route path="/multiple-release" element={<Dashboard />}></Route>*/}
      <Route path="/Withdraw Request" element={<WithdrawRequest />}></Route>
      <Route path="/All Transcations" element={<AllTranscations />}></Route>
      {/* <Route path="/Upload" element={<Upload />}></Route> */}
    </Routes>
  }
  const companyRoute = () => {
    return <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/One Release" element={<OneRelease />}></Route>
      <Route path="/main-step" element={<MainStep />}></Route>
      <Route path="All releases" element={<AllRelease />}></Route>
      <Route path="/final-submit" element={<FinalSubmit />}></Route>
      <Route path="/All drafts" element={<AllDraft />}></Route>
      <Route path="/all tracks" element={<AllTracks />}></Route>
      <Route path="/Daily Trends" element={<DailyTreads />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/bank information" element={<BankInformation />}></Route>
      <Route path="/support" element={<Support />}></Route>
      <Route path="/password change" element={<Password />}></Route>
      <Route path="/user access" element={<UserAccess />}></Route>
      <Route path="/Withdraw Request" element={<WithdrawRequest />}></Route>
      <Route path="/add-user" element={<UserAccessForm />}></Route>
      <Route path="/release-details" element={<ReleaseDetails />}></Route>
      <Route path="/edit-permission" element={<EditUserPermission />}></Route>
      <Route path="/Payment Operations" element={<PaymentOperations />}></Route>
      <Route path="/Financial Report" element={<FinancialReport />}></Route>
      <Route path="/multiple-release" element={<Dashboard />}></Route>
      {/* <Route path="/Task" element={<Task />}></Route> */}
      {/* <Route path="/ClientList" element={<ClientList />}></Route>
      <Route path="/EmployeeList" element={<EmployeeList />}></Route> */}



    </Routes>
  }
  const employeeRoute = () => {
    return <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}></Route>
      <Route path="/One Release" element={<OneRelease />}></Route>
      <Route path="/main-step" element={<MainStep />}></Route>
      <Route path="All releases" element={<AllRelease />}></Route>
      <Route path="/final-submit" element={<FinalSubmit />}></Route>
      <Route path="/All drafts" element={<AllDraft />}></Route>
      {/* <Route path="/all tracks" element={<AllTracks />}></Route> */}
      <Route path="/Daily Trends" element={<DailyTreads />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      {/* <Route path="/bank information" element={<BankInformation />}></Route> */}
      {/* <Route path="/support" element={<Support />}></Route> */}
      <Route path="/password change" element={<Password />}></Route>
      {/* <Route path="/user access" element={<UserAccess />}></Route> */}
      {/* <Route path="/User Mangement" element={<UserMangement />}></Route> */}
      {/* <Route path="/UserDetails" element={<UserDetails />}></Route> */}
      {/* <Route path="/add-user" element={<UserAccessForm />}></Route> */}
      <Route path="/release-details" element={<ReleaseDetails />}></Route>
      {/* <Route path="/edit-permission" element={<EditUserPermission />}></Route> */}
      {/* <Route path="/Payment Operations" element={<PaymentOperations />}></Route> */}
      {/* <Route path="/Financial Report" element={<FinancialReport />}></Route> */}
      <Route path="/multiple-release" element={<Dashboard />}></Route>
    </Routes>
  }


  useEffect(() => {
    getPermissoin();
    getProfile();
    setRouteState(userProfile?.role ? true : false)
  }, [userProfile?.role])

  return <div className='h-100' key={routeState}>
    { userProfile?.role === "employee" ? employeeRoute() :
    userProfile?.role === "company" ? companyRoute() :
    adminRoute()}
  </div>

}

export default App;
