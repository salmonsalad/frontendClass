(()=>{

  class WrapComnent extends React.Component {
    render(){
      return(
        <div id="wrap">
            <HeaderComponent/>
            {
            /* <MainComponent/>
            <FooterComponent/> */
            }
        </div>
      );
    }
  }
  
  class HeaderComponent extends React.Component {
    render(){
      return(
          <header id="header">
              <div className="left-box">

              </div>
              <div className="right-box">
                  <nav id="nav">
                      <ul>
                          <li>
                              <a href="#" className="main-btn main-btn1">MENU-1</a>
                              <div className="sub sub1">
                                  <ul>
                                      <li><a href="#">SubMenu-1</a></li>
                                      <li><a href="#">SubMenu-2</a></li>
                                      <li><a href="#">SubMenu-3</a></li>
                                      <li><a href="#">SubMenu-4</a></li>
                                  </ul>
                              </div>
                          </li>
                          <li>
                              <a href="#" className="main-btn main-btn2">MENU-2</a>
                              <div className="sub sub2">
                                  <ul>
                                      <li><a href="#">SubMenu-1</a></li>
                                      <li><a href="#">SubMenu-2</a></li>
                                      <li><a href="#">SubMenu-3</a></li>
                                      <li><a href="#">SubMenu-4</a></li>
                                  </ul>
                              </div>
                          </li>
                          <li>
                              <a href="#" className="main-btn main-btn3">MENU-3</a>
                              <div className="sub sub3">
                                  <ul>
                                      <li><a href="#">SubMenu-1</a></li>
                                      <li><a href="#">SubMenu-2</a></li>
                                      <li><a href="#">SubMenu-3</a></li>
                                      <li><a href="#">SubMenu-4</a></li>
                                  </ul>
                              </div>                    
                          </li>
                          <li>
                              <a href="#" className="main-btn main-btn4">MENU-4</a>
                              <div className="sub sub4">
                                  <ul>
                                      <li><a href="#">SubMenu-1</a></li>
                                      <li><a href="#">SubMenu-2</a></li>
                                      <li><a href="#">SubMenu-3</a></li>
                                      <li><a href="#">SubMenu-4</a></li>
                                  </ul>
                              </div>                    
                          </li>
                      </ul>
                  </nav>
              </div>
          </header>          
      );
    }
  }
  


  ReactDOM.render(
    <WrapComnent />,
    document.getElementById('root')
  );


})()