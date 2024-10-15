import { lazy, Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import "./assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./assets/css/style.css";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./context/ThemeContext";

import ScrollToTop from "./jsx/pages/ScrollToTop";

/// Dashboard
import Home from "./jsx/components/Dashboard/Home";
import DashboardDark from "./jsx/components/Dashboard/DashboardDark";
import Jobs from "./jsx/components/Dashboard/Jobs";
import MyProfile from "./jsx/components/Dashboard/MyProfile";
import Statistics from "./jsx/components/Dashboard/Statistics";
import Companies from "./jsx/components/Dashboard/Companies";
import Task from "./jsx/components/Dashboard/Task";

//Jobs
import JobLists from "./jsx/components/Jobs/JobLists";
import JobView from "./jsx/components/Jobs/JobView";
import JobApplication from "./jsx/components/Jobs/JobApplication";
import ApplyJob from "./jsx/components/Jobs/ApplyJob";
import NewJob from "./jsx/components/Jobs/NewJob";
import UserProfile from "./jsx/components/Jobs/UserProfile";

//CMS
import Content from "./jsx/components/Cms/Content";
import Menu from "./jsx/components/Cms/Menu";
import EmailTemplate from "./jsx/components/Cms/EmailTemplate";
import Blog from "./jsx/components/Cms/Blog";
//CMS Linking Pages
import ContentAdd from "./jsx/components/Cms/ContentAdd";
import AddMail from "./jsx/components/Cms/AddMail";
import AddBlog from "./jsx/components/Cms/AddBlog";
import BlogCategory from "./jsx/components/Cms/BlogCategory";

/// App
import AppProfile from "./jsx/components/AppsMenu/AppProfile/AppProfile";
import Compose from "./jsx/components/AppsMenu/Email/Compose/Compose";
import Inbox from "./jsx/components/AppsMenu/Email/Inbox/Inbox";
import Read from "./jsx/components/AppsMenu/Email/Read/Read";
import Calendar from "./jsx/components/AppsMenu/Calendar/Calendar";
import PostDetails from "./jsx/components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./jsx/components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./jsx/components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./jsx/components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./jsx/components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./jsx/components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./jsx/components/AppsMenu/Shop/ProductOrder";
import Customers from "./jsx/components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./jsx/components/charts/Sparkline";
import ChartJs from "./jsx/components/charts/Chartjs";
import RechartJs from "./jsx/components/charts/rechart";
import ApexChart from "./jsx/components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./jsx/components/bootstrap/Alert";
import UiAccordion from "./jsx/components/bootstrap/Accordion";
import UiBadge from "./jsx/components/bootstrap/Badge";
import UiButton from "./jsx/components/bootstrap/Button";
import UiModal from "./jsx/components/bootstrap/Modal";
import UiButtonGroup from "./jsx/components/bootstrap/ButtonGroup";
import UiListGroup from "./jsx/components/bootstrap/ListGroup";
import UiCards from "./jsx/components/bootstrap/Cards";
import UiCarousel from "./jsx/components/bootstrap/Carousel";
import UiDropDown from "./jsx/components/bootstrap/DropDown";
import UiPopOver from "./jsx/components/bootstrap/PopOver";
import UiProgressBar from "./jsx/components/bootstrap/ProgressBar";
import UiTab from "./jsx/components/bootstrap/Tab";
import UiPagination from "./jsx/components/bootstrap/Pagination";
import UiGrid from "./jsx/components/bootstrap/Grid";
import UiTypography from "./jsx/components/bootstrap/Typography";

/// Plugins
import Select2 from "./jsx/components/PluginsMenu/Select2/Select2";
import MainSweetAlert from "./jsx/components/PluginsMenu/SweetAlert/SweetAlert";
import Toastr from "./jsx/components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./jsx/components/PluginsMenu/JqvMap/JqvMap";
import Lightgallery from "./jsx/components/PluginsMenu/Lightgallery/Lightgallery";

//Redux
import Todo from "./jsx/pages/Todo";

/// Widget
import Widget from "./jsx/pages/Widget";

/// Table
import SortingTable from "./jsx/components/table/SortingTable/SortingTable";
import FilteringTable from "./jsx/components/table/FilteringTable/FilteringTable";
import DataTable from "./jsx/components/table/DataTable";
import BootstrapTable from "./jsx/components/table/BootstrapTable";

/// Form
import Element from "./jsx/components/Forms/Element/Element";
import Wizard from "./jsx/components/Forms/Wizard/Wizard";
import CkEditor from "./jsx/components/Forms/CkEditor/CkEditor";
import Pickers from "./jsx/components/Forms/Pickers/Pickers";
import FormValidation from "./jsx/components/Forms/FormValidation/FormValidation";

/// Pages

import LockScreen from "./jsx/pages/LockScreen";
import Error400 from "./jsx/pages/Error400";
import Error403 from "./jsx/pages/Error403";
import Error404 from "./jsx/pages/Error404";
import Error500 from "./jsx/pages/Error500";
import Error503 from "./jsx/pages/Error503";
import PrivateRoute from "./routes/Private-route";
import MainLayout from "./jsx/index";
import PublicRoute from "./routes/Public-route";
import LazyLoading from "./jsx/loader/Lazy-loading";
import CheckOto from "./jsx/pages/Check-otp";
import ChangePassword from "./jsx/pages/Change-password";
import ProfileSetting from "./jsx/components/Dashboard/Profile-setting";
import SiteSetting from "./jsx/components/Dashboard/Site-setting";
import Sellers from "./jsx/components/Sellers/Sellers";
import JobCreators from "./jsx/components/Dashboard/Job-creators";
import CreateSeller from "./jsx/components/Sellers/Create-seller";
import Clients from "./jsx/components/clients/Clients";
import CreateClient from "./jsx/components/clients/Create-client";
import News from "./jsx/components/news/News";
import CreateNews from "./jsx/components/news/Create-news";
import Emails from "./jsx/components/emails/Emails";
import Reviews from "./jsx/components/reviews/Reviews";
import Invoices from "./jsx/components/payments/Invoices";
import SingleJob from "./jsx/components/Jobs/Single-job";
import SingleNews from "./jsx/components/news/Single-news";
import SingleEmail from "./jsx/components/emails/Single-email";
import SingleReview from "./jsx/components/reviews/Single-review";
import Membership from "./jsx/components/membership/Membership";
import SingleMembership from "./jsx/components/membership/Single-membership";
import CreateMembership from "./jsx/components/membership/Create-membership";
import Credit from "./jsx/components/credit/Credit";
import SingleCredit from "./jsx/components/credit/Single-credit";
import CreateCredit from "./jsx/components/credit/Create-credit";
import Categorie from "./jsx/components/categorie/Categorie";
import SingleCategory from "./jsx/components/categorie/Single-category";
import CreateCategory from "./jsx/components/categorie/Create-category";

const SignUp = lazy(() => import("./jsx/pages/Registration"));
const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function App() {
  const allroutes = [
    /// allroutes
    { url: "", component: <Home /> },
    { url: "dashboard", component: <Home /> },
    { url: "dashboard-dark", component: <DashboardDark /> },
    { url: "site-setting", component: <SiteSetting /> },
    { url: "profile-setting", component: <ProfileSetting /> },
    { url: "search-jobs", component: <Jobs /> },
    { url: "my-profile", component: <MyProfile /> },
    { url: "statistics", component: <Statistics /> },
    { url: "companies", component: <Companies /> },
    { url: "task", component: <Task /> },

    //Jobs
    { url: "job-list", component: <JobLists /> },
    { url: "job-list/:id", component: <SingleJob /> },
    { url: "job-application", component: <JobApplication /> },
    { url: "job-creators", component: <JobCreators /> },
    { url: "job-view", component: <JobView /> },
    { url: "apply-job", component: <ApplyJob /> },
    { url: "new-job", component: <NewJob /> },
    { url: "user-profile", component: <UserProfile /> },

    // sellers
    { url: "sellers", component: <Sellers /> },
    { url: "create-seller", component: <CreateSeller /> },

    // clients
    { url: "clients", component: <Clients /> },
    { url: "create-client", component: <CreateClient /> },

    // news
    { url: "news", component: <News /> },
    { url: "news/:id", component: <SingleNews /> },
    { url: "create-news", component: <CreateNews /> },

    // emails
    { url: "emails", component: <Emails /> },
    { url: "emails/:id", component: <SingleEmail /> },

    // reviews
    { url: "reviews", component: <Reviews /> },
    { url: "reviews/:id", component: <SingleReview /> },

    // membership
    { url: "membership", component: <Membership /> },
    { url: "membership/:id", component: <SingleMembership /> },
    { url: "create-membership", component: <CreateMembership /> },

    // credits
    { url: "credit", component: <Credit /> },
    { url: "credit/:id", component: <SingleCredit /> },
    { url: "create-credit", component: <CreateCredit /> },

    // categories
    { url: "categories", component: <Categorie /> },
    { url: "categories/:id", component: <SingleCategory /> },
    { url: "create-categories", component: <CreateCategory /> },

    // payment
    { url: "invoices", component: <Invoices /> },

    //Cms
    { url: "content", component: <Content /> },
    { url: "menu", component: <Menu /> },
    { url: "email-template", component: <EmailTemplate /> },
    { url: "blog", component: <Blog /> },
    { url: "add-content", component: <ContentAdd /> },
    { url: "add-email", component: <AddMail /> },
    { url: "add-blog", component: <AddBlog /> },
    { url: "blog-category", component: <BlogCategory /> },

    /// Apps
    { url: "app-profile", component: <AppProfile /> },
    { url: "email-compose", component: <Compose /> },
    { url: "email-inbox", component: <Inbox /> },
    { url: "email-read", component: <Read /> },
    { url: "app-calender", component: <Calendar /> },
    { url: "post-details", component: <PostDetails /> },

    /// Chart
    { url: "chart-sparkline", component: <SparklineChart /> },
    { url: "chart-chartjs", component: <ChartJs /> },
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },

    /// Bootstrap
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-modal", component: <UiModal /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-card", component: <UiCards /> },
    { url: "ui-carousel", component: <UiCarousel /> },
    { url: "ui-dropdown", component: <UiDropDown /> },
    { url: "ui-popover", component: <UiPopOver /> },
    { url: "ui-progressbar", component: <UiProgressBar /> },
    { url: "ui-tab", component: <UiTab /> },
    { url: "ui-pagination", component: <UiPagination /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },

    /// Plugin
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "uc-toastr", component: <Toastr /> },
    { url: "map-jqvmap", component: <JqvMap /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },

    ///Redux
    { url: "todo", component: <Todo /> },
    /// Widget
    { url: "widget-basic", component: <Widget /> },

    /// Shop
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-customers", component: <Customers /> },

    /// Form
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-pickers", component: <Pickers /> },
    { url: "form-validation", component: <FormValidation /> },

    /// table
    { url: "table-filtering", component: <FilteringTable /> },
    { url: "table-sorting", component: <SortingTable /> },
    { url: "table-datatable-basic", component: <DataTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },
  ];

  return (
    <BrowserRouter basename="/">
      <ThemeContext>
        <Suspense fallback={<LazyLoading />}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/check-otp" element={<CheckOto />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="page-lock-screen" element={<LockScreen />} />
              <Route path="page-error-400" element={<Error400 />} />
              <Route path="page-error-403" element={<Error403 />} />
              <Route path="page-error-404" element={<Error404 />} />
              <Route path="page-error-500" element={<Error500 />} />
              <Route path="page-error-503" element={<Error503 />} />

              <Route element={<MainLayout />}>
                {allroutes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`${data.url}`}
                    element={data.component}
                  />
                ))}
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <ScrollToTop />
      </ThemeContext>
    </BrowserRouter>
  );
}

export default App;
