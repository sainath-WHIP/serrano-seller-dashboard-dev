import { useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { updateSellerAvatarUrl, updateSellerInfoUrl } from "../../networking/apiEndPoints";
import axios from "axios";
import { toast } from "react-toastify";
import { RxAvatar, RxCross2 } from "react-icons/rx";
import { getSellerInfo } from "../../redux/actions/sellerAction";

function ShopProfile() {
  const { seller } = useSelector((state) => state.seller);
  const [sellerInfo, setSellerInfo] = useState({
    name: seller?.name,
    email: seller?.email,
    phoneNumber: seller?.phoneNumber,
    address: seller?.address,
    zipCode: seller?.zipCode,
    avatar: seller?.avatar
  });
  const [modalOpen, setModalOpen] = useState(false);

  // new keyword always create a blank object for constructor function which is getting called just after new keyword;
  const updateSellerInfo = async () => {
    try {
      await axios
        .put(
          updateSellerInfoUrl,
          {
            name: sellerInfo.name,
            email: sellerInfo.email,
            phoneNumber: sellerInfo.phoneNumber,
            address: sellerInfo.address,
            zipCode: sellerInfo.zipCode,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("final response ", response);
          toast(response?.data?.message);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        });
    } catch (error) {
      console.log(" api is not working ", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="">
          <div className="flex items-center justify-center">
            <div className="bg-white px-14 py-10 w-[65%] rounded-[20px] shadow-lg">
              <div className="flex flex-col">
                <div className="flex items-center justify-center">
                  <div className="flex flex-col justify-center items-center mb-10">
                    <div className="">
                      <img
                        src={sellerInfo.avatar}
                        alt="shop"
                        className="w-32 h-32 rounded-full border border-[#ccc]"
                      />
                    </div>

                    <div>
                      <div className="mt-2 flex items-center">
                        
                        <label
                          htmlFor="file-input"
                          className="ml-5 w-[100%] px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          {/* <CiShop className="h-6 w-6" /> */}
                          <button onClick={() => setModalOpen(true)}>
                            Upload Shop Image
                          </button>
                          {/* <input
                            type="file"
                            name="avatar"
                            id="file-input"
                            onChange={handleFileInput}
                            className="sr-only"
                          /> */}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 justify-center">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={sellerInfo.name}
                      onChange={(e) =>
                        setSellerInfo({ ...sellerInfo, name: e.target.value })
                      }
                      className="py-2 px-4 shadow-sm border border-gray-400 outline-none rounded-lg capitalize text-sm font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={sellerInfo.email}
                      onChange={(e) =>
                        setSellerInfo({ ...sellerInfo, email: e.target.value })
                      }
                      className="py-2 px-4 shadow-sm border border-gray-400 outline-none rounded-lg text-sm font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={sellerInfo.phoneNumber}
                      onChange={(e) =>
                        setSellerInfo({
                          ...sellerInfo,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="py-2 px-4 shadow-sm border border-gray-400 outline-none rounded-lg capitalize text-sm font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={sellerInfo.address}
                      onChange={(e) =>
                        setSellerInfo({
                          ...sellerInfo,
                          address: e.target.value,
                        })
                      }
                      className="py-2 px-4 shadow-sm border border-gray-400 outline-none rounded-lg capitalize text-sm font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold">Zipcode</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={sellerInfo.zipCode}
                      className="py-2 px-4 shadow-sm border border-gray-400 outline-none rounded-lg capitalize text-sm font-normal"
                      onChange={(e) =>
                        setSellerInfo({
                          ...sellerInfo,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-10">
                  <button
                    className="bg-black rounded text-white w-[50%] py-2"
                    onClick={updateSellerInfo}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProfileModal
          Profile={seller?.avatar}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      </Layout>
    </>
  );
}

export default ShopProfile;

const ProfileModal = ({ Profile, setModalOpen, modalOpen }) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch()
  const handleAvatar = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const imageFile = e.target.querySelector('input[type="file"]').files[0];
    formData.append("image", imageFile);
    try {
      const response = await fetch(updateSellerAvatarUrl, {
        method: "PUT",
        body: formData,
        credentials: 'include'
      });
      const data = await response.json();
      toast(data?.message);
      dispatch(getSellerInfo());
      console.log("data", data);
    } catch (error) {
      console.log("Network Error:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-[#C4C4C4] w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold ">Profile Update</p>
                <div
                  onClick={() => setModalOpen(false)}
                  className="modal-close cursor-pointer z-50 flex "
                >
                  <div className="bg-[#fff] rounded-full border cursor-pointer w-8 h-8 justify-center items-center flex">
                    <RxCross2 className={"text-[#FF0000] text-2xl"} />
                  </div>
                </div>
              </div>
              <img
                src={avatar}
                alt="Profile"
                className="rounded-full mx-auto "
                style={{ width: "150px", height: "150px" }}
              />
              <form method="put" onSubmit={handleAvatar} className="mt-10">
                <div className="flex justify-evenly items-center">
                  <div>
                    <label
                      htmlFor="avatar"
                      className="block text-sm font-medium text-gray-700"
                    ></label>
                    <div>
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium text-gray-700"
                      ></label>
                      <div className="mt-2 flex items-center">
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                          {avatar ? (
                            <img
                              src={avatar}
                              alt="avatar"
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            <RxAvatar className="h-8 w-8" />
                          )}
                        </span>
                        <label
                          htmlFor="file-input"
                          className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <span>Upload a file</span>
                          <input
                            type="file"
                            name="avatar"
                            id="file-input"
                            onChange={handleFileInputChange}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-black rounded text-white px-4 py-1.5 "
                  >
                    Update profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
