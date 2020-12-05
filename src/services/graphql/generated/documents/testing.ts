import gql from 'graphql-tag';

export const FinishTest = gql`
    mutation FinishTest($testId: UUID!, $score: Int!) {
  finishTest(input: {testId: $testId, score: $score}) {
    startTesting {
      id
      startTime
      endTime
    }
  }
}
    `;
export const StartTest = gql`
    mutation StartTest($user_email: String!) {
  startTest(input: {userEmail: $user_email}) {
    startTesting {
      id
      startTime
      endTime
    }
  }
}
    `;
export const AllStartTestings = gql`
    query AllStartTestings {
  startTestings {
    nodes {
      endTime
      startTime
      id
    }
  }
}
    `;