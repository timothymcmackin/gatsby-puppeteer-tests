import { Link } from 'gatsby';
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import TagsDropdown from './tagsDropdown';
import './topNav.css';

// Navbar for the top of the site.

export default function TopNav({ tagList }) {

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
          <a className="nav-link" href="https://github.com/timothymcmackin/gatsby-puppeteer">Github</a>
          <TagsDropdown tagList={tagList}/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>)
}
