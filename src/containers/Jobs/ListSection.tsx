import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent } from "react";
import Typography from "ui-components/Typography/Typography";

import { ReactComponent as StarIcon } from "assets/svgs/star.svg"

import candidatesEn from './Candidates_en.json'
import candidatesUa from './Candidates_ua.json'
import { Candidate, Stage } from "common/types/common";
import { useTranslation } from "react-i18next";
import { RoutePaths } from "containers/AppRouter";
import { useNavigate } from "react-router-dom";

type ListProps = {
  candidates: Array<Candidate>
}

type ListItemProps = {
  item: Partial<Candidate>
}

type RectagleProps = {
  color?: string
}

const Rectagle: FunctionComponent<RectagleProps> = ({ color = 'strock' }) => {

  console.log(`w-[10px] h-[6px] bg-${color ? color : 'strock'}`)

  return <div className={`w-[10px] h-[6px] ${color ? color : 'bg-strock'}`} />
}

type StageCompProps = {
  title: string
  stage: number
  color: string
}

const StageComp: FunctionComponent<StageCompProps> = ({ title, color, stage }) => {

  return <div className='grid gap-[0.25rem]'>
    <div>{title}</div>
    <div className='flex gap-1'>{new Array(5).fill(null).map((item, index) => <Rectagle color={(index < stage) && color} />)}</div>
  </div>
}

const ListItem: FunctionComponent<ListItemProps> = ({ item }) => {

  const { t } = useTranslation(TranslationNamespace.candidates)
  
  const navigate = useNavigate()

  const getStage = () => {
    switch (item.stages) {
      case Stage.SHORTLIST:
        return { title: t('stages.SHORTLIST'), color: 'bg-blueLight', stage: 1 }
      case Stage.PREINTERVIEW:
        return { title: t('stages.PREINTERVIEW'), color: 'bg-yellow', stage: 2 }
      case Stage.INTERVIEW:
        return { title: t('stages.INTERVIEW'), color: 'bg-yellow', stage: 3 }
      case Stage.TEST:
        return { title: t('stages.TEST'), color: 'bg-blue', stage: 4 }
      case Stage.APPLIED:
        return { title: t('stages.APPLIED'), color: 'bg-green', stage: 5 }
      case Stage.NOT_APPLIED:
        return { title: t('stages.NOT_APPLIED'), color: 'bg-red', stage: 5 }
      default:
        return { title: '', color: '', stage: 0 }
    }
  }

  return (
    <div className='bg-white text-natural grid gap-2 grid-cols-5 items-center py-[0.75rem] px-[1.5rem] border-b border-strock last:border-0' onClick={() => navigate(RoutePaths.JOB_DETAILS)}>
      <div className='text-natural'>{`${item.name} ${item.surname}`}</div>
      <div className='flex gap-[6px] items-center px-[8px] py-[6px] rounded-[5px] border border-strock w-min'>
        <StarIcon className={item.rating ? 'fill-yellow' : 'fill-greyLight'} />
        <span className={!item.rating ? 'text-greyLight' : ''}>{item.rating.toFixed(1)}</span>
      </div>
      <div><StageComp {...getStage()} /></div>
      <div>03 March, 2022</div>
      <div>Cameron Williamson</div>
    </div>
  )
}

const List: FunctionComponent<ListProps> = ({ candidates }) => {
  const { t } = useTranslation(TranslationNamespace.candidates)

  const list = candidates.map((item) => <ListItem item={item} />)

  return <div className=''>
    <div className='rounded-lg bg-white text-natural grid gap-2 mb-3 grid-cols-5 items-center py-[0.75rem] px-[1.5rem] border-b border-strock last:border-0'>
      <span>{t('name')}</span>
      <span>{t('rating')}</span>
      <span>{t('stagesTitle')}</span>
      <span>{t('appliedDate')}</span>
      <span>{t('owner')}</span>
    </div>
    <div className="rounded-lg overflow-hidden">
      {list}
    </div>
  </div>
}

export default List

addTranslationNamespace(TranslationNamespace.candidates, candidatesEn, candidatesUa)
