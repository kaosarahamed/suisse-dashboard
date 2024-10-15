import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useCreateCategoryMutation } from "../../../redux/rtk/features/categorie/categorieApi";

const CreateCategory = () => {
  const [createCategory, { data, isLoading, isSuccess, isError, error }] =
    useCreateCategoryMutation();

  const [reqData, setReqData] = useState({
    title: "",
    category: "",
    image: "",
    logo: "",
    status: "",
  });

  const { title, category, image, logo, status } = reqData || {};

  const hadnleChange = (e) => {
    setReqData({
      ...reqData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setReqData((prevState) => {
      if (name === "logo") {
        return {
          ...prevState,
          logo: files[0],
        };
      } else if (name === "image") {
        return {
          ...prevState,
          image: files[0],
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("logo", logo);
    formData.append("image", image);
    createCategory(formData);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      setReqData({
        title: "",
        category: "",
        image: "",
        logo: "",
        status: "",
      });
      document.getElementById("logo").value = null;
      document.getElementById("image").value = null;
    }
  }, [data, isSuccess, isError, error]);

  return (
    <>
      <div className="d-flex align-items-center mb-4">
        <h3 className="mb-0 me-auto">Create New Credit</h3>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Enter Title<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="title"
                      value={title}
                      onChange={hadnleChange}
                    />
                  </div>
                  <div className="col-xl-6  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Enter Category<span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control solid"
                      name="category"
                      value={category}
                      onChange={hadnleChange}
                    />
                  </div>
                  <div className="col-xl-4  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Select Category Logo
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="file"
                      name="logo"
                      id="logo"
                      accept=".jpg, .jpeg, .png"
                      className="form-control solid"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-xl-4  col-md-6 mb-4">
                    <label className="form-label font-w600">
                      Select Category Image
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept=".jpg, .jpeg, .png"
                      className="form-control solid"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="col-xl-4 mb-4">
                    <label className="form-label font-w600">
                      Select Category Status
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <select
                      value={status}
                      onChange={hadnleChange}
                      name="status"
                      className="nice-select default-select wide form-control solid"
                    >
                      <option selected>Choose...</option>
                      <option value="pending">Pending</option>
                      <option value="publish">Publish</option>
                    </select>
                  </div>
                  <div className="modal-footer">
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
                        "Create Membership"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
export default CreateCategory;
