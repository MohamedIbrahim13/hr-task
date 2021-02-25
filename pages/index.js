import Head from "next/head";
import Link from "next/link";
import moment from 'moment'

export const getStaticProps = async () => {
  const res = await fetch("http://80.240.21.204:1337/news?skip=12&limit=10");
  const data = await res.json();

  return {
    props: {
      news: data.news,
    },
  };
};

export default function Home({ news }) {
  //console.log(news);
  // I could make seperate and reusable components of Navbar & Sidebar but i listed it all in index.js file
  // I also used  BootStrap 5 for quick styling..
  // I couldn't make Infinite Scroll because i'm still discovering Nextjs
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
          crossorigin="anonymous"
          defer
        ></script>
        <title>Nextjs Task</title>
      </Head>
      <nav
        className="navbar navbar-expand-sm navbar-dark bg-success mb-4"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <Link href="#">
            <a className="navbar-brand">NewsBuzz</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav mr-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link href="#">
                  <a className="nav-link rounded-pill" aria-current="page">
                    LOGIN
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#">
                  <a className="nav-link rounded-pill" aria-current="page">
                    REGISTER
                  </a>
                </Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-3">Sidebar Component</div>
          <div className="col-sm-6">
            {news &&
              news.map((singleNew) => {
                return (
                  <div className="card mb-3 shadow-sm" key={singleNew._id} style={{borderRadius:'15px'}}>
                    <div className="card-header d-flex flex-row justify-content-between">
                      <img className="img-fluid" src={singleNew.source.url} style={{height:'40px',width:'40px'}}/>
                      <div className="">{singleNew.source.title}</div>
                      
                    </div>
                    <div className="card-body">
                      <h4 className="card-title mb-3">{singleNew.title}</h4>
                      <p className="card-text text-muted">
                        {moment(singleNew.created_at).format('LLLL')}
                      </p>
                    </div>
                    <div className="card-footer d-flex flex-row">
                      {singleNew.keywords.map((kword) => {
                        return (
                          
                            <Link href="#" key={kword._id}>
                              <a className="rounded-pill mx-1 d-block btn btn-outline-success">
                                {kword.name}
                              </a>
                            </Link>
                          
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-sm-3">Sidebar Component</div>
        </div>
      </div>
    </>
  );
}
