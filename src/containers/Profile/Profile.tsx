import { TranslationNamespace, addTranslationNamespace } from "common/translations";
import { FunctionComponent, useState } from "react";
import Typography from "ui-components/Typography/Typography";

import profileEn from './Profile_en.json'
import profileUa from './Profile_ua.json'
import { useTranslation } from "react-i18next";

const Profile: FunctionComponent = () => {
  const { t } = useTranslation(TranslationNamespace.profile)

  return <div>
    123
  </div>
}

export default Profile

addTranslationNamespace(TranslationNamespace.profile, profileEn, profileUa)
