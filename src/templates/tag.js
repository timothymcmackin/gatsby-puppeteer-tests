import React from 'react';
import { Link, graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/pageHeader';
import TopNav from '../components/topNav';

export default function TagTemplate({ data, pageContext }) {

  const listOfTopicsWithThisTag = data.allMarkdownRemark.edges.map((topic) => (<li
    key={topic.node.frontmatter.path}>
      <Link to={topic.node.frontmatter.path}>
        {topic.node.frontmatter.title}
      </Link>
      </li>));

  return (
    <>
    <PageHeader title={`Tag: ${pageContext.tag}`} />
    <TopNav tagList={pageContext.tagList}/>
    <Container>
      <Row>
        <Col xl="3" lg="3">
          <div className="left-container">Left column stuff goes here.</div>
        </Col>
        <Col xl="9" lg="9">
          <div className="content-container">
            <h1>{data.allMarkdownRemark.totalCount} page{data.allMarkdownRemark.totalCount > 1 ? 's' : null} tagged with "{pageContext.tag}"</h1>
            <div className="content">
              <ul>
                {listOfTopicsWithThisTag}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}


export const pageQuery = graphql`
query topicsForTagPage($tag: String)
{
  allMarkdownRemark(
    limit: 1000
    filter: { frontmatter: { tags: { in: [$tag] } } }
  ) {
    totalCount
    edges {
      node {
        frontmatter {
          title
          path
        }
      }
    }
  }
}
`;
