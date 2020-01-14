import React from 'react';
import { graphql } from 'gatsby';
import { Container, Row, Col } from 'react-bootstrap';
import TopNav from '../components/topNav';
import Search from '../components/search';
import PageHeader from '../components/pageHeader';

export default function SearchPage({ data, pageContext }) {
  return (
  <>
  <PageHeader title="Search" />
  <TopNav tagList={pageContext.tagList}/>
  <Container>
    <Row>
      <Col xl="3" lg="3">
      </Col>
      <Col xl="9" lg="9">
        <div className="content-container">
            <h1>Search</h1>
            <div className="content">
              <Search searchIndex={data.siteSearchIndex.index}/>
            </div>
        </div>
      </Col>
    </Row>
  </Container>
  </>
  );
}

export const searchPageQuery = graphql`
query queryForSearchPage
{
  siteSearchIndex {
    index
  }
}
`;
