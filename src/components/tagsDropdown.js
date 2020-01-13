import { Link } from 'gatsby';
import React from 'react';
import { Nav } from 'react-bootstrap';
import DropdownMenu from 'react-dd-menu';
import 'react-dd-menu/dist/react-dd-menu.css';

// Dropdown list that shows the tags in the site.
// Accepts an array of tag names from gatsby-node.js.

export default class TagsDropdown extends React.Component {
  state = {
    isMenuOpen: false,
    tagList: this.props.tagList,
  };

  toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <Nav.Link href="#" onClick={this.toggle}>Tags</Nav.Link>,
      align: 'left',
    };
    
    return this.state.tagList ? (
      <DropdownMenu {...menuOptions}>
        {this.state.tagList.map((tag) => (
          <li key={tag}>
            <Link to={`/tags/${tag}.html`}>{tag}</Link>
          </li>
        ))}
      </DropdownMenu>
      ) : null;

  }
}
