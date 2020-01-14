import { Link } from 'gatsby';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import TagsDropdown from './tagsDropdown';
import './topNav.css';

// Navbar for the top of the site.

export default function TopNav() {

  return (
    <>
    <Navbar expand="lg" id="navbar">
      <Navbar.Brand><Link
      to='/'
      id="homePageLink">
        My site
      </Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <a className="nav-link" 
            href="https://github.com/timothymcmackin/gatsby-puppeteer-tests" id="githubLink">Github</a>
          <TagsDropdown/>
          <Link
            className="nav-link"
            to="/search.html"
            id="searchPageLink"
          >
            Search
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>)
}
