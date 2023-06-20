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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/productList");
        if (response) {
          setIsFetched(true);
        }
        setActivateProjectList(
          response.data.filter((project) => project.isActive === true)
        );
        setOldProjectList(
          response.data.filter((project) => project.isActive === false)
        );
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleGetReport = (project, index) => {
    console.log(project);
    const updatedActiveProductList = [...activeProjectList];
    updatedActiveProductList[index].isActive = false;
    const updatedOldProjectList = [...oldProjectList];
    updatedOldProjectList.push(updatedActiveProductList[index]);
    setOldProjectList(updatedOldProjectList);
    updatedActiveProductList.splice(index, 1);
    setActivateProjectList(updatedActiveProductList);
  };
  return (
    <div>
      <UserNavBar />

      {!isFetched && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}

      {isFetched &&
      activeProjectList.length === 0 &&
      oldProjectList.length === 0 ? (
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
                      <p> number of products: {item.products.length}</p>

                      <IconButton
                        onClick={() => {
                          navigate("/user/project-detail", {
                            state: { projectInfo: item },
                          });
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
                      <p> number of products: {item.products.length}</p>
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
                        onClick={() => {
                          navigate("/user/project-detail", {
                            state: { projectInfo: item },
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
