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
          productType: "product1",
          location: { lat: "52.52354266184729", lon: "13.402872545835251" },
        },
        {
          productType: "product2",
          location: { lat: "29.790997667390602", lon: "-95.42082544600602" },
        },
        {
          productType: "product3",
          location: { lat: "10.354327612932527", lon: "8.9098909746236" },
        },
        {
          productType: "product1",
          location: { lat: "-40.05223471309356", lon: "175.7040239802963" },
        },
      ],
    },
    {
      projectName: "cool project 2",
      products: [
        {
          productType: "product5",
          location: { lat: "-30.838135690317998", lon: "25.831053571561217" },
        },
        {
          productType: "product6",
          location: { lat: "45.399653535078905", lon: "-73.80632344399605" },
        },
        {
          productType: "product1",
          location: { lat: "37.69617113244384", lon: "127.05813788317204" },
        },
        {
          productType: "product9",
          location: { lat: "33.670987810534456", lon: "73.00879833202784" },
        },
      ],
    },
    {
      projectName: "cool project 3",
      products: [
        {
          productType: "product55",
          location: { lat: "-15.838135690317998", lon: "25.831053571561217" },
        },
        {
          productType: "product63",
          location: { lat: "45.399653535078905", lon: "-63.80632344399605" },
        },
        {
          productType: "product12",
          location: { lat: "27.69617113244384", lon: "127.05813788317204" },
        },
        {
          productType: "product92",
          location: { lat: "33.670987810534456", lon: "43.00879833202784" },
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
                <p>{item.projectName}</p>
                <p>products:</p>
                {item.products.map((product, index) => {
                  return (
                    <div key={index}>
                      <p>
                        {product.productType}, location:{product.location.lat},
                        {product.location.lon}
                      </p>
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    navigate("/user/project-detail", {
                      state: { projectInfo: item },
                    });
                  }}
                >
                  detail
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
