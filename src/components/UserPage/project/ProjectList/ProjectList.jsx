import ProjectMap from "../ProjectMap";
import {
  ProjectListContainer,
  ProjectContainer,
  ProjectInfoContainer,
} from "./style";
import CreateReport from "../CreateReport/CreateReport";
import { useNavigate } from "react-router-dom";
const ProjectList = () => {
  const navigate = useNavigate();
  return (
    <div>
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
          <h3>project name</h3>
          <button>detail</button>
          <ProjectInfoContainer>
            <ProjectMap
              height="80vh"
              width="85vw"
              center={{ lat: "52.52354266184729", lng: "13.402872545835251" }}
              markers={[
                { lat: "52.52354266184729", lng: "13.402872545835251" },
                { lat: "29.790997667390602", lng: "-95.42082544600602" },
                { lat: "10.354327612932527", lng: "8.9098909746236" },
                { lat: "-40.05223471309356", lng: "175.7040239802963" },
              ]}
            />
            <p>some project detail</p>
          </ProjectInfoContainer>
        </ProjectContainer>
        <ProjectContainer>
          <h3>project name 2</h3>
          <ProjectInfoContainer>
            <ProjectMap
              height="40vh"
              width="80vw"
              center={{ lat: "52.52354266184729", lng: "13.402872545835251" }}
              markers={[
                { lat: "-30.838135690317998", lng: "25.831053571561217" },
                { lat: "45.399653535078905", lng: "-73.80632344399605" },
                { lat: "37.69617113244384", lng: "127.05813788317204" },
                { lat: "33.670987810534456", lng: "73.00879833202784" },
              ]}
            />
            <p>some project detail</p>
          </ProjectInfoContainer>
          <CreateReport />
        </ProjectContainer>
      </ProjectListContainer>
    </div>
  );
};

export default ProjectList;
