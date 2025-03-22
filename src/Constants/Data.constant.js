// const domainUrl = 'https://tuneplusbackend.onrender.com/';
 const domainUrl = 'http://localhost:8002/';
// const domainUrl = 'http://192.168.1.18:8001/';
// const endpoint = "https://api.ridd.in/api/"


const mainUrl = domainUrl
const imageServerUrl = domainUrl + '';
const USER_TYPE = "User"
const base = {
  login: mainUrl + 'auth/login',
  signUp: mainUrl + 'auth/signup',
  forgetPassword: mainUrl + 'auth/forgetpassword',
  setPassword: mainUrl + 'auth/setPassword',
  verifyOtp: mainUrl + 'auth/verifyOtp',
  changePassword: mainUrl + 'auth/user-change-password',
  addOneRelease: mainUrl + "release/add-one-release",
  releaseStep1: mainUrl + 'release/step-one-release',
  releaseStep2: mainUrl + 'release/step-two-release',
  deleteFile: mainUrl + 'release/deletefile',
  releaseStep3: mainUrl + 'release/step-three-release',
  deleteTrack: mainUrl + 'release/deleteTrack',
  releaseStep5: mainUrl + 'release/step-five-release',
  finalReleaseSubmit: mainUrl + 'release/SubmitFinalRelease',
  releaseList: mainUrl + 'release/release-list',
  allDraftList: mainUrl + 'release/all-draft-list',
  allReleaseList: mainUrl + 'release/all-release-list',
  adminAllReleaseList: mainUrl + 'release/admin-all-release-list',
  releaseDetails: mainUrl + 'release/release-details',
  deleteOneRelease:  mainUrl + 'release/release-delete',
  deleteUserparmanent:  mainUrl + 'auth/user-permanentdelete',
  addArtist: mainUrl + 'artist/add-artist',
  fetchArtistList: mainUrl + 'artist/artist-list',
  userProfile: mainUrl + 'auth/user-profile',
  addLabel: mainUrl + 'release/add-label',
  labelList: mainUrl + 'release/label-list',
  trackUpdate: mainUrl + 'release/tracks-update',
  addStore: mainUrl + 'release/step-four-release',
  listStore: mainUrl + 'release/list-store',
  tracksList: mainUrl + 'release/tracks-list',
  addSupport: mainUrl + 'support/add-support',
  supportList: mainUrl + 'support/support-list',
  addBank: mainUrl + 'bank/add-bank',
  bankDetails: mainUrl + 'bank/bank-details',
  updateProfile: mainUrl + 'auth/profile-update',
  addPermission: mainUrl + 'permission/add-permission',
  myPermission: mainUrl + 'permission/my-permission',
  getUserList: mainUrl + 'permission/my-user-list',
  sendWithdrawal: mainUrl + 'wallet/send-withdrawal',
  getWithdraw: mainUrl + 'wallet/get-withdrawal-by-id',
  updatePermission: mainUrl + 'permission/update-permission',
  userList: mainUrl + 'auth/user-list',
  deleteUser: mainUrl + 'auth/user-delete',
  getWithdrawList: mainUrl + 'wallet/get-withdraw-request',
  withdrawStatus: mainUrl + 'wallet/withdraw-status',
  uploadTracks: mainUrl + 'excel/send-track',
  getTracks: mainUrl + 'excel/get-track',
  uploadStore: mainUrl + 'excel/sent-store',
  getStore: mainUrl + 'excel/get-store',
  sendReport: mainUrl + 'excel/sent-salesAsset',
  getReport: mainUrl + 'excel/get-salesAsset',
  sendInside:mainUrl+'excel/sent-insides',
  getInside:mainUrl+'excel/get-insides',
  getFilterReport: mainUrl + 'excel/getFilterReport',
  sendReport: mainUrl + 'excel/sent-salesAsset',
  getReport: mainUrl + 'excel/get-salesAsset',
  getFilterReport: mainUrl + 'excel/getFilterReport',
  uploadMarket: mainUrl + 'excel/sent-market',
  getMarket: mainUrl + 'excel/get-market',
  sendStream: mainUrl + 'excel/sent-stream',
  getStream: mainUrl + 'excel/get-stream',
  addCompany: mainUrl + 'company/addCompany',
  releaseChangeStatus: mainUrl + 'release/release-update-status',
  getReportbydate: mainUrl + 'excel/get-report-by-date',
  getUser: mainUrl + "auth/get-user",
  dashboardCount: mainUrl+"dashboard/get-dashboard-list",
  getAllReport: mainUrl + "excel/get-all-report",
  deleteStore: mainUrl + "excel/delete-report"
};
export { base, domainUrl, imageServerUrl, USER_TYPE };