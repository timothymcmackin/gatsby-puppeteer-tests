import { Link, StaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Nav } from 'react-bootstrap';
import DropdownMenu from 'react-dd-menu';
import 'react-dd-menu/dist/react-dd-menu.css';

import { buildTagList } from '../utils.js';

// Dropdown list that shows the tags in the site.

export default class TagsDropdown extends React.Component {
  state = {
    isMenuOpen: false,
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
      toggle: <Nav.Link href="#" onClick={this.toggle} className="tagsDropdownLink">Tags</Nav.Link>,
      align: 'left',
      className: "tagsDropdown",
    };

    return (
      <StaticQuery
        query={graphql`
        query allTagsQuery {
          allMarkdownRemark(
            limit: 1000
          ) {
            edges {
              node {
                frontmatter {
                  tags
                }
              }
            }
          }
        }
      `}
        render={(data) => {
          const allTags = buildTagList(data.allMarkdownRemark.edges);
          return (
              <DropdownMenu {...menuOptions}>
                {allTags.map((tag) => (
                  <li key={tag}>
                    <Link to={`/tags/${tag}.html`}>{tag}</Link>
                  </li>
                ))}
              </DropdownMenu>
          );
        }}
      />
    );

  }
}
