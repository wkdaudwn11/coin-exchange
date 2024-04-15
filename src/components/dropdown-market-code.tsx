import type { GetMarketCodeResponse } from '@/types/market-code';

type Props = {
  activeValue: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionList?: GetMarketCodeResponse;
};

const DropdownMarketCode = ({
  optionList,
  activeValue,
  handleChange,
}: Props) => (
  <div className="form-control w-full max-w-xs">
    <label className="label">
      <span className="label-text">코인 선택</span>
    </label>
    <select
      className="select w-full max-w-xs"
      name="market"
      value={activeValue}
      onChange={handleChange}
    >
      {optionList?.map((item) => (
        <option key={item.market} value={item.market}>
          {item.korean_name} / {item.english_name}
        </option>
      ))}
    </select>
  </div>
);

export default DropdownMarketCode;
