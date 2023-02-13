import Logout from "./logout";

const Home = ({user, updateUser}) => {
  return (
  <div class="main d-flex text-center text-white bg-dark">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <header class="mb-auto">
          <div>
              <h3 class="float-md-left mb-0">beepTrip</h3>
              <nav class="nav nav-masthead justify-content-center float-md-right">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                  <a class="nav-link" href="/campgrounds">Campgrounds</a>
                  {user.username ? 
                  null :
                  <>
                    <a class="nav-link" href="/login">Login</a>
                    <a class="nav-link" href="/register">Register</a>
                  </>   
                  }
              </nav>
          </div>
      </header>
      <main class="px-3">
          <h1>beepTrip</h1>
          <p class="lead"> Welcome to beepTrip!  Jump right in and explore our many campgrounds. 
              Feel free to share some of your own and comment on others!</p>
          <a href="/campgrounds" class="btn btn-lg btn-secondary font-weight-bold border-white bg-white">View
              Campgrounds</a>
      </main>

      <footer class="mt-auto text-white-50">
          <p>&copy; 2020 </p>
      </footer>


    </div>;
  </div>
  
)};

export default Home;
