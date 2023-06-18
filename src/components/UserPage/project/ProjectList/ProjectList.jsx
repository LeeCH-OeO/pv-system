import {
  ProjectListContainer,
  ActiveProjectContainer,
  OldProjectContainer,
  ProjectItem,
  LoaderContainer,
  Loader,
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
      <h1>Project list</h1>
      {!isFetched && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {activeProjectList.length !== 0 && (
        <>
          <button
            onClick={() => {
              navigate("/user/new-project");
            }}
          >
            create new project
          </button>
          <button onClick={() => setShowOldProject(!showOldProject)}>
            {showOldProject ? "hide old project" : "show old project"}
          </button>
        </>
      )}
      {isFetched && activeProjectList.length === 0 ? (
        <div>
          <h2>create your new project</h2>{" "}
          <button
            onClick={() => {
              navigate("/user/new-project");
            }}
          >
            create new project
          </button>
        </div>
      ) : (
        <ProjectListContainer>
          {showOldProject && (
            <OldProjectContainer>
              {oldProjectList.map((item, index) => {
                return (
                  <div key={index}>
                    <h3>{item.projectName}</h3>
                    <p> number of products: {item.products.length}</p>

                    <button
                      onClick={() => {
                        navigate("/user/project-detail", {
                          state: { projectInfo: item },
                        });
                      }}
                    >
                      show report
                    </button>
                  </div>
                );
              })}
            </OldProjectContainer>
          )}
          <ActiveProjectContainer>
            {activeProjectList.map((item, index) => {
              return (
                <ProjectItem key={index}>
                  <h3>{item.projectName}</h3>
                  <p> number of products: {item.products.length}</p>

                  <button
                    onClick={() => {
                      navigate("/user/project-detail", {
                        state: { projectInfo: item },
                      });
                    }}
                  >
                    open map
                  </button>
                  <button
                    onClick={() => {
                      handleGetReport(item, index);
                    }}
                  >
                    get report
                  </button>
                </ProjectItem>
              );
            })}
          </ActiveProjectContainer>
        </ProjectListContainer>
      )}
    </div>
  );
};

export default ProjectList;
