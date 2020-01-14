import React from 'react';
import { Link, graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/pageHeader';
import TopNav from '../components/topNav';

// Home page.

export default function HomePage({ data }) {
  const pageList = <ul>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.frontmatter.path}>
          <Link to={node.frontmatter.path}>
            {node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>;
  return (
    <>
    <PageHeader title="Home" />
    <TopNav/>
    <Container>
      <Row>
        <Col xl="3" lg="3">
        </Col>
        <Col xl="9" lg="9">
          <div className="content-container">
            <h1>Home</h1>
            <div className="content">
              Pages on this site:
              {pageList}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export const pageQuery = graphql`
query allPages {
  allMarkdownRemark(
    limit: 1000
  ) {
    edges {
      node {
        frontmatter {
          path
          title
        }
      }
    }
  }
}
`;
