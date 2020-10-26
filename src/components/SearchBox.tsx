import React from "react";
import { Input } from "antd";

const { Search } = Input;

export const SearchBox = (props: SearchBoxProps) => {
  return (
    <Search
      placeholder="Search Country"
      enterButton
      style={{ width: 400, height: 200 }}
      onSearch={(value: string) => props.setSearch(value)}
    />
  );
};

interface SearchBoxProps {
  setSearch: (value: string) => void;
}
