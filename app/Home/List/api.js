import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

class AntApi {

  constructor() {
    this.client = new ApolloClient({
      uri: 'https://antserver-blocjgjbpw.now.sh/graphql'
    })
  }
    
  async getAllAntsList() {
    return this.client.query({
      query: gql`
            {
                ants {
                    name,
                    color
                }
            }
    `});
  }
}

export default AntApi;