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
} from "./style";
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

  const handleGetReport = async (project, index) => {
    console.log(project);
    // const updatedActiveProductList = [...activeProjectList];
    // updatedActiveProductList[index].isActive = false;
    // const updatedOldProjectList = [...oldProjectList];
    // updatedOldProjectList.push(updatedActiveProductList[index]);
    // setOldProjectList(updatedOldProjectList);
    // updatedActiveProductList.splice(index, 1);
    // setActivateProjectList(updatedActiveProductList);
    try {
      const res = await axios({
        method: "delete",
        url: "http://127.0.0.1:1212/api/project/finish",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        data: { projectName: project.projectName },
      });
      if (res) {
        const updatedActiveProductList = [...activeProjectList];
        updatedActiveProductList[index].isActive = false;
        const updatedOldProjectList = [...oldProjectList];
        updatedOldProjectList.push(updatedActiveProductList[index]);
        setOldProjectList(updatedOldProjectList);
        updatedActiveProductList.splice(index, 1);
        setActivateProjectList(updatedActiveProductList);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
              onClick={() => {
                navigate("/user/new-project");
              }}
            >
              <span class="material-icons">add</span>
            </FabButton>
            <FabButton
              secondary
              onClick={() => setShowOldProject(!showOldProject)}
            >
              {showOldProject ? (
                <span class="material-icons">toggle_off</span>
              ) : (
                <span class="material-icons">toggle_on</span>
              )}
            </FabButton>
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
                          getProductList(item._id);
                        }}
                      >
                        <span class="material-icons">info</span>
                      </IconButton>
                    </div>
                  </PorjectItemContainer>
                );
              })}
            </ProjectContainer>
          )}
          {!showOldProject && (
            <ProjectContainer>
              {activeProjectList.map((item, index) => {
                return (
                  <PorjectItemContainer>
                    <ProjectItem key={index}>
                      <h3>{item.projectName}</h3>
                    </ProjectItem>
                    <ProjectButtonContainer>
                      <IconButton
                        onClick={() => {
                          handleGetReport(item, index);
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
