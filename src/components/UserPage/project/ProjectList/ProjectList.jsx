import { ProjectListContainer, ProjectContainer } from "./style";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../../NavBar/UserNavBar";
const ProjectList = () => {
  const navigate = useNavigate();
  const templist = [
    {
      projectName: "cool project1",
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
      <ProjectListContainer>
        <ProjectContainer>
          {templist.map((item, index) => {
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
                  open map
                </button>
              </div>
            );
          })}
        </ProjectContainer>
      </ProjectListContainer>
    </div>
  );
};

export default ProjectList;
