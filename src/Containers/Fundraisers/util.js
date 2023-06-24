export const categoryOptions = [
  'EDUCATION',
  'MEDICAL',
  'WOMANANDGIRLS',
  'ANIMALS',
  'CREATIVE',
  'FOODANDHUNGER',
  'ENVIRONMENT',
  'CHILDREN',
  'MEMORIAL',
  'COMMUNITYDEVELOPMENT',
  'OTHERS',
];

export const formatFundraiserData = (_FR, _isBlacklisted, _isNew) => {
  return {
    id: _FR?.id,
    raisedBy: _FR?.raisedBy,
    raisedFor: _FR?.raisedFor,
    amount: _FR?.amount?.toNumber(),
    amountRaised: _FR?.amountRaised?.toNumber(),
    amountClaimed: _FR?.amountClaimed?.toNumber(),
    about: _FR?.about,
    createdOn: _FR?.createdOn?.toNumber() * 1000,
    category: categoryOptions?.[_FR?.category],
    isActive: _FR?.isActive,
    totalSupportors: _FR?.totalSupportors?.toNumber(),
    amountReturned: _FR?.amountReturned,
    isBlacklisted: _isNew ? false : _isBlacklisted,
  };
};
