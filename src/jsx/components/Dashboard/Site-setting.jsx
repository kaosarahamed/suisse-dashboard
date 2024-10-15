import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetSettingQuery,
  useUpdateSettingMutation,
} from "../../../redux/rtk/features/setting/settingApi";
import toast, { Toaster } from "react-hot-toast";
import ImageLoading from "../../../loading/Image-loading";

const SiteSetting = () => {
  const [setting, setSetting] = useState({
    heading: "",
    footer: "",
    googleMap: "",
    YTvideo: "",
    footerlogo: "",
    headerlogo: "",
    favicon: "",
  });
  const { data, isLoading: getLoading } = useGetSettingQuery();
  const [
    updateSetting,
    { data: upData, isLoading, isSuccess, isError, error },
  ] = useUpdateSettingMutation();
  const {
    heading,
    footer,
    googleMap,
    YTvideo,
    favicon,
    headerlogo,
    footerlogo,
  } = setting || {};

  const handleChange = (e) => {
    setSetting({
      ...setting,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (data) {
      setSetting(data);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setSetting((prevState) => {
      if (name === "footerlogo") {
        return {
          ...prevState,
          footerlogo: files[0],
        };
      } else if (name === "headerlogo") {
        return {
          ...prevState,
          headerlogo: files[0],
        };
      } else if (name === "favicon") {
        return {
          ...prevState,
          favicon: files[0],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("footer", footer);
    formData.append("googleMap", googleMap);
    formData.append("YTvideo", YTvideo);
    formData.append("footerlogo", footerlogo);
    formData.append("headerlogo", headerlogo);
    formData.append("favicon", favicon);
    const id = data?._id;
    updateSetting({ formData, id });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(upData?.message);
    }
  }, [upData, isSuccess, isError, error]);

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-xxl-12 mt-0">
          <div className="row">
            <div className="col-xl-12 col-xxl-12">
              <div className="row site-info">
                <div className="col-xl-6">
                  <h4 className="fs-20 font-w600">Web app heading</h4>
                  <p className="fs-18">
                    {getLoading ? <ImageLoading /> : heading}
                  </p>
                </div>

                <div className="col-xl-6">
                  <h4 className="fs-20 font-w600">Web app footer text</h4>
                  <p className="fs-18">
                    {getLoading ? <ImageLoading /> : footer}
                  </p>
                </div>
                <div className="col-xl-4 mt-5">
                  <h4 className="fs-20 font-w600">Web app header logo</h4>
                  <img
                    src={getLoading ? <ImageLoading /> : data?.headerlogo}
                    alt=""
                    style={{
                      width: `300px`,
                    }}
                  />
                </div>
                <div className="col-xl-4 mt-5">
                  <h4 className="fs-20 font-w600">Web app footer logo</h4>
                  <img
                    src={getLoading ? <ImageLoading /> : data?.footerlogo}
                    alt=""
                    style={{
                      width: "300px",
                    }}
                  />
                </div>
                <div className="col-xl-4 mt-5">
                  <h4 className="fs-20 font-w600">Web app favicon</h4>
                  <img
                    src={getLoading ? <ImageLoading /> : data?.favicon}
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">Update web app info</h3>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Web app heading
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="heading"
                      value={heading}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-4  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Web app footer text
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="footer"
                      value={footer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-4  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Google Map URL
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="googleMap"
                      value={googleMap}
                      onChange={handleChange}
                      placeholder="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1398189.185..."
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Youtube URL
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="YTvideo"
                      value={YTvideo}
                      onChange={handleChange}
                      placeholder="https://www.youtube.com/embed/yhaF89p3e-U?si=gNP7IA7-3ycITTUw"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Web app favicon (16PX * 16Px)
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control solid"
                      name="favicon"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Web app header logo
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control solid"
                      name="headerlogo"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Web app footer logo
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control solid"
                      name="footerlogo"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <div className="save-setting">
                  <Link to={"#"} className="btn btn-danger light me-3">
                    Close
                  </Link>
                  <button type="submit" className="btn btn-primary save-btn">
                    {isLoading ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="spinner"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                        <p className="loading-text">Loading...</p>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Toaster />
    </>
  );
};
export default SiteSetting;
