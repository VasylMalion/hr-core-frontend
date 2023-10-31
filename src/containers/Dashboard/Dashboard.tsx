import { FunctionComponent } from "react";
import AsyncSelect from "react-select/async";
import { useLazyFindCandidateQuery } from "services/CandidateService";

const Dashboard: FunctionComponent = () => {
    
  const [getCandidates2, users] = useLazyFindCandidateQuery()


  return <div>
    It is the Dashboard page


    <AsyncSelect
            cacheOptions
            placeholder="Search by name"
            isClearable={true}
            loadOptions={async (query: string) => {
              await getCandidates2({username: query}).unwrap();
                return users.data?.map((user) => ({ label: user.name, value: user.id }));
            }}
          />
  </div>
}

export default Dashboard