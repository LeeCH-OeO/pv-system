import {
  ProjectListContainer,
  ProjectContainer,
  OldProjectContainer,
  ProjectItem,
  LoaderContainer,
  Loader,
  TitleContainer,
  TextButton,
  ButtonContainer,
  PorjectItemContainer,
  FabButton,
  IconButton,
  ProjectButtonContainer,
  UpdateButton,
} from "./style";
import { DialogOverlay, DialogContainer } from "./Modal";
import Barchart from "./Barchart";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../NavBar/UserNavBar";
import { useState, useEffect } from "react";
import axios from "axios";
const ProjectList = () => {
  const navigate = useNavigate();
  const [showOldProject, setShowOldProject] = useState(false);
  const [activeProjectList, setActivateProjectList] = useState([]);
  const [oldProjectList, setOldProjectList] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState({ start: "", end: "" });
  const [finishProject, setFinishProject] = useState({});
  const [finishProjectIndex, setFinishProjectIndex] = useState("");
  const [reportData, setReportData] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const getReport = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/project/report",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: { projectName: data.projectName },
      });
      if (res) {
        console.log(res.data.result);
        setReportData(res.data.result);
        setShowModal(true);
      }
    } catch (error) {}
  };
  const updateNow = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/project/update-now",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (res) {
        alert("Weather data has been synchronized");
      }
    } catch (err) {}
  };
  const handleOnSubmit = async (project, index) => {
    console.log(duration);
    try {
      const res = await axios({
        method: "delete",
        url: "http://127.0.0.1:1212/api/project/finish",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: {
          projectID: finishProject._id,
          projectName: finishProject.projectName,
          start: duration.start,
          end: duration.end,
        },
      });
      if (res) {
        window.location.reload();
        const updatedActiveProductList = [...activeProjectList];
        updatedActiveProductList[finishProjectIndex].isActive = false;
        const updatedOldProjectList = [...oldProjectList];
        updatedOldProjectList.push(
          updatedActiveProductList[finishProjectIndex]
        );
        setOldProjectList(updatedOldProjectList);
        updatedActiveProductList.splice(finishProjectIndex, 1);
        setActivateProjectList(updatedActiveProductList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const maxDate = today.toISOString().split("T")[0];
  const minDate = oneYearAgo.toISOString().split("T")[0];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "get",
          url: "http://127.0.0.1:1212/api/project/",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        if (response) {
          setIsFetched(true);
          console.log(response.data);
        }
        setActivateProjectList(
          response.data.filter((project) => project.isActive === true)
        );
        setOldProjectList(
          response.data.filter((project) => project.isActive === false)
        );
      } catch (error) {
        console.log("err:", error);
        setIsEmpty(true);
      }
    };
    fetchData();
  }, []);

  // const handleGetReport =  () => {
  //   setShowModal(!showModal);
  // };
  const getProductList = async (projectID) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:1212/api/userproduct/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: { projectID: projectID },
      });
      return response.data;
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <div>
      <UserNavBar />

      {isEmpty ? (
        <TitleContainer>
          <h2>create your new project</h2>
          <FabButton
            color="#f44336"
            right="20px"
            onClick={() => {
              navigate("/user/new-project");
            }}
          >
            <span class="material-icons">add</span>{" "}
          </FabButton>
        </TitleContainer>
      ) : (
        <ProjectListContainer>
          <TitleContainer>
            {showOldProject ? <h2>Old Project</h2> : <h2>Currect project</h2>}
          </TitleContainer>
          <>
            <FabButton
              color="#f44336"
              right="20px"
              onClick={() => {
                if (
                  localStorage.getItem("isUnlimited") === "false" &&
                  activeProjectList.length === 1
                ) {
                  alert("Free user can only have one project ");
                } else {
                  navigate("/user/new-project");
                }
              }}
            >
              <span class="material-icons">add</span>
            </FabButton>
            <FabButton
              color="#2196f3"
              right="100px"
              onClick={() => setShowOldProject(!showOldProject)}
            >
              {showOldProject ? (
                <span class="material-icons">toggle_off</span>
              ) : (
                <span class="material-icons">toggle_on</span>
              )}
            </FabButton>
            {activeProjectList.length !== 0 && (
              <FabButton
                color="#50C878"
                right="180px"
                onClick={() => updateNow()}
              >
                <span class="material-icons">cloud_sync</span>
              </FabButton>
            )}
          </>
          {showOldProject && (
            <ProjectContainer>
              {oldProjectList.map((item, index) => {
                return (
                  <PorjectItemContainer>
                    <div key={index}>
                      <h3>{item.projectName}</h3>

                      <IconButton
                        onClick={() => {
                          getReport(item);
                        }}
                      >
                        <span class="material-icons">info</span>
                      </IconButton>
                    </div>
                  </PorjectItemContainer>
                );
              })}
              {showModal && (
                <DialogOverlay>
                  <DialogContainer open onClose={() => setShowModal(false)}>
                    <div>
                      <h3>
                        {reportData.projectName} From: {reportData.startDate},
                        Until: {reportData.endDate}
                      </h3>
                      {/* {reportData.productOutPut.map((item) => {
                        console.log(item.output);
                        return <h4>{item.output}</h4>;
                      })} */}
                      <Barchart data={reportData.productOutPut} />
                      <button onClick={() => setShowModal(false)}>close</button>
                    </div>
                  </DialogContainer>
                </DialogOverlay>
              )}
            </ProjectContainer>
          )}
          {!showOldProject && (
            <ProjectContainer>
              {activeProjectList.map((item, index) => {
                return (
                  <PorjectItemContainer>
                    <ProjectItem key={index}>
                      <h3>{item.projectName}</h3>
                      {showModal && (
                        <div>
                          <label>From:</label>
                          <input
                            min={minDate}
                            max={maxDate}
                            type="date"
                            value={duration.start}
                            onChange={(e) =>
                              setDuration({
                                ...duration,
                                start: e.target.value,
                              })
                            }
                          />
                          <label>until:</label>
                          <input
                            min={minDate}
                            max={maxDate}
                            type="date"
                            value={duration.end}
                            onChange={(e) =>
                              setDuration({ ...duration, end: e.target.value })
                            }
                          />
                          <button
                            onClick={handleOnSubmit}
                            disabled={
                              duration.start && duration.end ? false : true
                            }
                          >
                            submit
                          </button>
                        </div>
                      )}
                    </ProjectItem>
                    <ProjectButtonContainer>
                      <IconButton
                        onClick={() => {
                          setShowModal(!showModal);
                          setFinishProject(item);
                          setFinishProjectIndex(index);
                        }}
                      >
                        <span class="material-icons">check_circle_outline</span>
                      </IconButton>
                      <IconButton
                        onClick={async () => {
                          const productList = await getProductList(item._id);
                          navigate("/user/project-detail", {
                            state: {
                              projectInfo: productList,
                              projectID: item._id,
                              projectName: item.projectName,
                            },
                          });
                        }}
                      >
                        <span class="material-icons">info</span>
                      </IconButton>
                    </ProjectButtonContainer>
                  </PorjectItemContainer>
                );
              })}
            </ProjectContainer>
          )}
        </ProjectListContainer>
      )}
    </div>
  );
};

export default ProjectList;
