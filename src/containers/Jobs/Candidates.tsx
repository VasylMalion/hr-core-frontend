import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent } from "react";
import Typography from "ui-components/Typography/Typography";

import candidatesEn from './Candidates_en.json'
import candidatesUa from './Candidates_ua.json'
import List from "./ListSection";
import { Candidate, Stage } from "common/types/common";

const candidates: Array<Candidate> = [
  {
    id: 2,
    avatar: '123',
    name: 'Vasyl',
    surname: '',
    birthDate: '01-01-2000',
    rating: 0.0,
    stages: Stage.SHORTLIST,
    createdAt: '',
    appliedAt: '',
    owner: 0
  },
  {
    id: 2,
    avatar: '123',
    name: 'Vasyl',
    surname: '',
    birthDate: '01-01-2000',
    rating: 4.5,
    stages: Stage.PREINTERVIEW,
    createdAt: '',
    appliedAt: '',
    owner: 0
  },
  {
    id: 2,
    avatar: '123',
    name: 'Vasylw',
    surname: 'Malionw asdasd',
    birthDate: '01-01-2000',
    rating: 4.5,
    stages: Stage.INTERVIEW,
    createdAt: '',
    appliedAt: '',
    owner: 0
  },
  {
    id: 3,
    avatar: '123',
    name: 'Vasylw',
    surname: 'sdfsdfs',
    birthDate: '01-01-2000',
    rating: 4.5,
    stages: Stage.TEST,
    createdAt: '',
    appliedAt: '',
    owner: 0
  },
  {
    id: 4,
    avatar: '123',
    name: 'Vasylw',
    surname: 'Malionw dsfsdfsd',
    birthDate: '01-01-2000',
    rating: 4.5,
    stages: Stage.APPLIED,
    createdAt: '',
    appliedAt: '',
    owner: 0
  },
  {
    id: 4,
    avatar: '123',
    name: 'Vasylw',
    surname: 'Malionw dsfsdfsd',
    birthDate: '01-01-2000',
    rating: 4.5,
    stages: Stage.NOT_APPLIED,
    createdAt: '',
    appliedAt: '',
    owner: 0
  },
]

const Candidates: FunctionComponent = () => {
    
    return <div>
      <Typography appearance='title'>
        Candidates
      </Typography>
      <Typography appearance='subtitle'>
        Candidates
      </Typography>
      <List candidates={candidates}/>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </div>
}

export default Candidates

addTranslationNamespace(TranslationNamespace.candidates, candidatesEn, candidatesUa)
