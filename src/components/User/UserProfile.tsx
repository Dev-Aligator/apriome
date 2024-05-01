import "../../styles/UserProfile.sass";
import { AleartProps, UserFeature } from "../Interface/InterfaceCollection";
import { userDefaultAvatat } from "../../assets";
import { useEffect, useState } from "react";
import { AxiosInstance } from "axios";
import Aleart from "../Aleart";

interface UserProfileProps {
  userInfo: [String, UserFeature | null];
  client: AxiosInstance;
}

const UserProfile = ({ userInfo, client }: UserProfileProps) => {
  const [formData, setFormData] = useState({
    firstName: userInfo[1]?.firstName ? userInfo[1]?.firstName : "",
    lastName: userInfo[1]?.lastName ? userInfo[1]?.lastName : "",
    photoUrl: userInfo[1]?.photoUrl ? userInfo[1]?.photoUrl : userDefaultAvatat,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    setFormData({
      firstName: userInfo[1]?.firstName || "",
      lastName: userInfo[1]?.lastName || "",
      photoUrl: userInfo[1]?.photoUrl || userDefaultAvatat,
    });
  }, [userInfo]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    client.post("/api/post/update_user/", formData).then(function (res) {
      console.log(res);
      setAleartInfo({
        isAleart: 1,
        title: "Success",
        normalText: "Information Updated !",
        strongText: "Check again",
      });
    });
  };
  const [tempProfilePicture, setTempProfilePicture] = useState("");
  const updateProfilePicture = () => {
    setTempProfilePicture(formData.photoUrl);
  };
  const [aleartInfo, setAleartInfo] = useState<AleartProps>({
    isAleart: 0,
  });

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <Aleart
        isAleart={aleartInfo.isAleart}
        title={aleartInfo.title}
        normalText={aleartInfo.normalText}
        strongText={aleartInfo.strongText}
        setAleartInfo={setAleartInfo}
        severity={aleartInfo.severity}
        color={aleartInfo.color}
      ></Aleart>

      <h4 className="font-weight-bold py-3 mb-4 placeholder">
        Account settings
      </h4>
      <div className="card overflow-hidden card-profile">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
              >
                General
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-change-password"
              >
                Change password
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-info"
              >
                Info
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-social-links"
              >
                Social links
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-connections"
              >
                Connections
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-notifications"
              >
                Notifications
              </a>
            </div>
            <div className="text-right mt-3 save-changes-div">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save changes
              </button>
              &nbsp;
              {/* <button type="button" className="btn btn-default">
                Cancel
              </button> */}
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="account-general">
                <div className="card-body media align-items-center">
                  <img
                    src={
                      tempProfilePicture
                        ? tempProfilePicture
                        : userInfo[1]?.photoUrl
                        ? userInfo[1].photoUrl
                        : userDefaultAvatat
                    }
                    className="d-block ui-w-80"
                  ></img>
                  <div className="media-body ml-4">
                    <input
                      type="url"
                      className="form-control mb-1"
                      value={formData.photoUrl}
                      name="photoUrl"
                      onChange={handleChange}
                    ></input>
                    &nbsp;
                    <button
                      type="button"
                      className="profile-custom-button md-btn-flat"
                      onClick={() => {
                        updateProfilePicture();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <hr className="border-light m-0"></hr>
                <div className="card-body">
                  <div className="form-group">
                    <label className="userform-label">First Name</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      value={formData.firstName}
                      name="firstName"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lastName}
                      name="lastName"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">E-mail</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      value={`${userInfo[0]}`}
                      disabled={true}
                    ></input>
                    <div className="alert alert-warning mt-3">
                      Your email is not confirmed. Please check your inbox.
                      <br></br>
                      <a href="javascript:void(0)">Resend confirmation</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Company Ltd."
                    ></input>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="account-change-password">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="userform-label">Current password</label>
                    <input type="password" className="form-control"></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">New password</label>
                    <input type="password" className="form-control"></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">
                      Repeat new password
                    </label>
                    <input type="password" className="form-control"></input>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="account-info">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="userform-label">Bio</label>
                    <textarea className="form-control" rows={5}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris nunc arcu, dignissim sit amet sollicitudin iaculis,
                      vehicula id urna. Sed luctus urna nunc. Donec fermentum,
                      magna sit amet rutrum pretium, turpis dolor molestie diam,
                      ut lacinia diam risus eleifend sapien. Curabitur ac nibh
                      nulla. Maecenas nec augue placerat, viverra tellus non,
                      pulvinar risus.
                    </textarea>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Birthday</label>
                    <input
                      type="text"
                      className="form-control"
                      value="May 3, 1995"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Country</label>
                    <select className="custom-select">
                      <option>USA</option>
                      <option selected>Canada</option>
                      <option>UK</option>
                      <option>Germany</option>
                      <option>France</option>
                    </select>
                  </div>
                </div>
                <hr className="border-light m-0"></hr>
                <div className="card-body pb-2">
                  <h6 className="mb-4">Contacts</h6>
                  <div className="form-group">
                    <label className="userform-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      value="+0 (123) 456 7891"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Website</label>
                    <input type="text" className="form-control"></input>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="account-social-links">
                <div className="card-body pb-2">
                  <div className="form-group">
                    <label className="userform-label">Twitter</label>
                    <input
                      type="text"
                      className="form-control"
                      value="https://twitter.com/user"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      value="https://www.facebook.com/user"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Google+</label>
                    <input type="text" className="form-control"></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">LinkedIn</label>
                    <input type="text" className="form-control"></input>
                  </div>
                  <div className="form-group">
                    <label className="userform-label">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      value="https://www.instagram.com/user"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="account-connections">
                <div className="card-body">
                  <button type="button" className="btn btn-twitter">
                    Connect to
                    <strong>Twitter</strong>
                  </button>
                </div>
                <hr className="border-light m-0"></hr>
                <div className="card-body">
                  <h5 className="mb-2">
                    <a
                      href="javascript:void(0)"
                      className="float-right text-muted text-tiny"
                    >
                      <i className="ion ion-md-close"></i> Remove
                    </a>
                    <i className="ion ion-logo-google text-google"></i>
                    You are connected to Google:
                  </h5>
                  <a
                    href="/cdn-cgi/l/email-protection"
                    className="__cf_email__"
                    data-cfemail="f9979498818e9c9595b994989095d79a9694"
                  >
                    [email&#160;protected]
                  </a>
                </div>
                <hr className="border-light m-0"></hr>
                <div className="card-body">
                  <button type="button" className="btn btn-facebook">
                    Connect to
                    <strong>Facebook</strong>
                  </button>
                </div>
                <hr className="border-light m-0"></hr>
                <div className="card-body">
                  <button type="button" className="btn btn-instagram">
                    Connect to
                    <strong>Instagram</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
