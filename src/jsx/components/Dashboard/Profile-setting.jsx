import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetOneAdminQuery,
  useUpdateAdminMutation,
  useUpdateAdminPassMutation,
} from "../../../redux/rtk/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";

const ProfileSetting = () => {
  const auth = localStorage.getItem("admin");
  const jsonCon = JSON.parse(auth);
  const id = jsonCon?.admin?._id;
  const { data } = useGetOneAdminQuery(id);
  const [
    updateAdminPass,
    {
      data: passData,
      isLoading: passLoading,
      isSuccess: passSuccess,
      isError: passIsError,
      error: passError,
    },
  ] = useUpdateAdminPassMutation();
  const [updateAdmin, { data: upData, isLoading, isSuccess, isError, error }] =
    useUpdateAdminMutation();
  const [admin, setAdmin] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    followers: "",
    about: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    following: "",
    title: "",
    city: "",
    zip: "",
    country: "",
    businesId: "",
    computer: "",
    photoshop: "",
    microsoft: "",
    headline: "",
    cover: "",
    profile: "",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {
    username,
    fullname,
    email,
    phone,
    followers,
    about,
    facebook,
    instagram,
    linkedin,
    youtube,
    following,
    title,
    city,
    zip,
    country,
    businesId,
    computer,
    photoshop,
    microsoft,
    headline,
    cover,
    profile,
  } = admin || {};

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("followers", followers);
    formData.append("about", about);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedin);
    formData.append("youtube", youtube);
    formData.append("following", following);
    formData.append("title", title);
    formData.append("city", city);
    formData.append("zip", zip);
    formData.append("country", country);
    formData.append("businesId", businesId);
    formData.append("computer", computer);
    formData.append("photoshop", photoshop);
    formData.append("microsoft", microsoft);
    formData.append("headline", headline);
    formData.append("cover", cover);
    formData.append("profile", profile);
    updateAdmin({ formData, id });
  };
  useEffect(() => {
    if (data) {
      setAdmin(data);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setAdmin((prevState) => {
      if (name === "cover") {
        return {
          ...prevState,
          cover: files[0],
        };
      } else if (name === "profile") {
        return {
          ...prevState,
          profile: files[0],
        };
      }
    });
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (password !== newPassword) {
      toast.error("Password does not match");
    } else if (password.length < 8 || newPassword.length < 8) {
      toast.error("Password length more then 8 character");
    } else {
      updateAdminPass({ password, id });
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(upData?.message);
    }
  }, [upData, isSuccess, isError, error]);

  useEffect(() => {
    if (passIsError) {
      toast.error(passError?.data?.message);
    }
    if (passSuccess) {
      toast.success(passData?.message);
    }
  }, [passData, passSuccess, passIsError, passError]);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">Update your info</h3>
      </div>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Username
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      aria-label="name"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Full Name<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="fullname"
                      value={fullname}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Email<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control solid"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Phone<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="phone"
                      value={phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Followers
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="followers"
                      value={followers}
                      onChange={handleChange}
                      placeholder="example 100"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Following
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="following"
                      value={following}
                      onChange={handleChange}
                      placeholder="example 200"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Headline<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="headline"
                      value={headline}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Title<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="title"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Facebook URL
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control solid"
                      name="facebook"
                      value={facebook}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Instagram URL
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control solid"
                      name="instagram"
                      value={instagram}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Linkedin URL
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control solid"
                      name="linkedin"
                      value={linkedin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      YouTube URL
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control solid"
                      name="youtube"
                      value={youtube}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      City<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="city"
                      value={city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Zip Code<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="zip"
                      value={zip}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Country<span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="country"
                      value={country}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Computer Skill (Use percentage)
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="computer"
                      value={computer}
                      onChange={handleChange}
                      placeholder="example 20%"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Photoshop Skill (Use percentage)
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="photoshop"
                      value={photoshop}
                      onChange={handleChange}
                      placeholder="example 30%"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Microsoft Skill (Use percentage)
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="microsoft"
                      value={microsoft}
                      onChange={handleChange}
                      placeholder="example 50%"
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Profile Picture
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control solid"
                      name="profile"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Cover Photo
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control solid"
                      name="cover"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="col-xl-6 mb-4">
                    <label className="form-label font-w600">
                      About me:
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <textarea
                      className="form-control solid"
                      rows="6"
                      aria-label="With textarea"
                      name="about"
                      value={about}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Busines ID
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control solid"
                      name="businesId"
                      value={businesId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <div className="save-setting">
                  <Link to={"/"} className="btn btn-danger light me-3">
                    Close
                  </Link>
                  <button
                    type="submit"
                    to={"#"}
                    className="btn btn-primary save-btn"
                  >
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
      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">Update your password</h3>
      </div>
      <div className="row">
        <form onSubmit={handlePassword}>
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      New Password
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control solid"
                      aria-label="name"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      New Password
                      <span className="text-danger scale ms-2">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control solid"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer text-end">
                <div className="save-setting">
                  <Link to={"/"} className="btn btn-danger light me-3">
                    Close
                  </Link>
                  <button
                    type="submit"
                    to={"#"}
                    className="btn btn-primary save-btn"
                  >
                    {passLoading ? (
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
export default ProfileSetting;
