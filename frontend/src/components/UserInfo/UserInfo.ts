import AtCoderProblemsAPIClient from '../../utils/AtCoderProblemsAPIClient/atCoderProblemsAPIClient';

export default class UserInfo {
  public readonly atCoderProblemsAPIClient;

  constructor(atCoderProblemsAPIClient: AtCoderProblemsAPIClient) {
    this.atCoderProblemsAPIClient = atCoderProblemsAPIClient;
  }
}
