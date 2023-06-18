import {
  ProjectListContainer,
  ActiveProjectContainer,
  OldProjectContainer,
  ProjectItem,
} from "./style";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../NavBar/UserNavBar";
import { useState } from "react";
const ProjectList = () => {
  const navigate = useNavigate();
  const [showOldProject, setShowOldProject] = useState(false);
  const templist = [
    {
      projectName: "cool project1",
      isActive: true,
      products: [
        {
          location: { lat: "52.52354266184729", lon: "13.402872545835251" },
          area: "2",
          orientation: "East",
          tilt: "2",
          type: "3",
        },
        {
          location: { lat: "29.790997667390602", lon: "-95.42082544600602" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "10.354327612932527", lon: "8.9098909746236" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "-40.05223471309356", lon: "175.7040239802963" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
      ],
    },
    {
      projectName: "cool project2",
      isActive: true,
      products: [
        {
          location: { lat: "52.52354266184729", lon: "13.402872545835251" },
          area: "2",
          orientation: "East",
          tilt: "2",
          type: "3",
        },
        {
          location: { lat: "29.790997667390602", lon: "-95.42082544600602" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "10.354327612932527", lon: "8.9098909746236" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "-40.05223471309356", lon: "175.7040239802963" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
      ],
    },
    {
      projectName: "cool project3",
      isActive: true,
      products: [
        {
          location: { lat: "52.52354266184729", lon: "13.402872545835251" },
          area: "2",
          orientation: "East",
          tilt: "2",
          type: "3",
        },
        {
          location: { lat: "29.790997667390602", lon: "-95.42082544600602" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "10.354327612932527", lon: "8.9098909746236" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "-40.05223471309356", lon: "175.7040239802963" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
      ],
    },
    {
      projectName: "cool project4",
      isActive: true,
      products: [
        {
          location: { lat: "52.52354266184729", lon: "13.402872545835251" },
          area: "2",
          orientation: "East",
          tilt: "2",
          type: "3",
        },
        {
          location: { lat: "29.790997667390602", lon: "-95.42082544600602" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "10.354327612932527", lon: "8.9098909746236" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "-40.05223471309356", lon: "175.7040239802963" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
      ],
    },

    {
      projectName: "cool old  project1",
      isActive: false,
      products: [
        {
          location: { lat: "52.52354266184729", lon: "13.402872545835251" },
          area: "2",
          orientation: "East",
          tilt: "2",
          type: "3",
        },
        {
          location: { lat: "29.790997667390602", lon: "-95.42082544600602" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "10.354327612932527", lon: "8.9098909746236" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
        {
          location: { lat: "-40.05223471309356", lon: "175.7040239802963" },
          area: "1",
          orientation: "East",
          tilt: "3",
          type: "4",
        },
      ],
    },
  ];

  const [activeProjectList, setActivateProjectList] = useState(
    templist.filter((project) => project.isActive === true)
  );
  const [oldProjectList, setOldProjectList] = useState(
    templist.filter((project) => project.isActive === false)
  );
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
    </div>
  );
};

export default ProjectList;
