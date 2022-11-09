import BasicTemplate from '@/components/templates/BasicTemplate';
import AccountSetting from '@/components/setting/AccountSetting';

function Account() {
  return (
    <BasicTemplate title="내 계정" hasBackButton>
      <AccountSetting />
    </BasicTemplate>
  );
}

export default Account;
