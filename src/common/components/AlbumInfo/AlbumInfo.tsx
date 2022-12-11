import uuid from 'react-uuid';
import { TitleInfo, IconButton } from '@/common/components';
import DetailInfo from '../DetailInfo/DetailInfo';
import styled, { css } from 'styled-components';
import { ProcessedResult, ProcessedTracklist } from '@/types/data';

export interface ResultViewProps {
  view: 'block' | 'list' | 'detail';
}
export interface AlbumInfoProps extends ResultViewProps {
  searchResult: ProcessedResult;
  tracklist?: ProcessedTracklist;
  page: 'all' | 'collection';
}

function AlbumInfo({
  searchResult,
  tracklist,
  page,
  view,
  ...props
}: AlbumInfoProps) {
  const buttonSize = view === 'block' ? 16 : 32;
  const buttonType = page === 'all' ? 'plus' : 'minus';
  const { titleInfo, detailInfo } = searchResult;

  const listInfo = detailInfo.filter(
    ({ infoName }) => infoName === 'Released' || infoName === 'Genre'
  );
  const newDetailInfo = tracklist ? [...detailInfo, tracklist] : detailInfo;

  return (
    <>
      <AlbumInfoWrapper view={view} {...props}>
        <TitleInfo
          title={titleInfo.title}
          artist={titleInfo.artist}
          view={view}
        />
        {view === 'list' && (
          <ListInfoWrapper>
            {listInfo.map(({ infoName, infoContent, isValid }) => (
              <DetailInfo
                key={uuid()}
                infoName={infoName}
                infoContent={infoContent}
                isValid={isValid}
              />
            ))}
          </ListInfoWrapper>
        )}
        <StyledIconButton
          width={buttonSize}
          height={buttonSize}
          iconType={buttonType}
          view={view}
          clickHandler={() => console.log('아이콘 버튼 클릭!')}
        />
      </AlbumInfoWrapper>
      {view === 'detail' && (
        <DetailInfoWrapper>
          {newDetailInfo.map(({ infoName, infoContent, isValid }) => (
            <DetailInfo
              key={uuid()}
              infoName={infoName}
              infoContent={infoContent}
              isValid={isValid}
            />
          ))}
        </DetailInfoWrapper>
      )}
    </>
  );
}

const WRAPPER_STYLE = {
  block: css`
    width: 150px;
    height: 76px;
    padding: var(--space-md) var(--space-xs);
  `,
  list: css`
    width: 618px;
    height: 152px;
  `,
  detail: css`
    width: 394px;
    height: 160px;
    padding: 36px var(--space-xs);
  `,
};

const BUTTON_STYLE = {
  block: css`
    top: var(--space-lg);
    right: var(--space-xs);
  `,
  list: css`
    top: 60px;
    right: 0px;
  `,
  detail: css`
    top: 64px;
    right: var(--space-xs);
  `,
};

const AlbumInfoWrapper = styled.div<ResultViewProps>`
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  ${({ view }) => WRAPPER_STYLE[view]};
`;

const ListInfoWrapper = styled.dl`
  display: grid;
  grid-template-columns: 103px 483px;
  row-gap: 8px;
  width: 394px;
  margin-top: var(--space-lg);
`;

const DetailInfoWrapper = styled.dl`
  display: grid;
  grid-template-columns: 107px 267px;
  row-gap: var(--space-bs);
  width: 394px;
  padding: 0px var(--space-xs);
`;

const StyledIconButton = styled(IconButton)<ResultViewProps>`
  position: absolute;
  ${({ view }) => BUTTON_STYLE[view]};
`;

export default AlbumInfo;
