import React from 'react';
import { Link, graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import PageHeader from '../components/pageHeader';
import TopNav from '../components/topNav';

// Page component for the pages in the content/ folder.
// Called by gatsby-node.js.

export default function Template({data, pageContext }) {
  const page = data.markdownRemark;

  return (
    <>
    <PageHeader title={`${page.frontmatter.title}`} />
    <TopNav tagList={pageContext.tagList}/>
    <Container>
      <Row>
        <Col xl="3" lg="3">
          <div className="left-container">{page.frontmatter.title} are:
            <ul>
              {page.frontmatter.tags.map((tag) => {
                return (<li key={tag}>
                  <Link to={`/tags/${tag}.html`}>{tag}</Link>
                </li>)
              })}
            </ul>
          </div>
        </Col>
        <Col xl="9" lg="9">
          <div className="content-container">
            <h1>{page.frontmatter.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: page.html }}
            />
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}


export const pageQuery = graphql`
query pageByPath($path: String!) {
  markdownRemark(frontmatter: {path: {eq: $path}}) {
    html
    frontmatter {
      path
      title
      tags
    }
  }
}
`;
