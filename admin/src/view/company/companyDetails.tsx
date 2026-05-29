import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ButtonIcon from 'src/view/shared/ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/company/form/companyFormActions';
import listactions from 'src/modules/company/list/companyListActions';
import selectors from 'src/modules/company/list/companyListSelectors';
import Spinner from 'src/view/shared/Spinner';
import { FormProvider, useForm } from 'react-hook-form';
import ImagesFormItem from 'src/view/shared/form/items/ImagesFormItem';
import Storage from 'src/security/storage';

function CompanyDetails() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const record = useSelector(selectors.selectRows);
  const loading = useSelector(selectors.selectLoading);
  const [recordContent, setRecordContent] = useState('');

  const dispatch = useDispatch();

  const form = useForm({
    mode: 'all',
    defaultValues: {
      certificate: [],
    },
  });

  const doSubmit = () => {
    const rawContentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(rawContentState));
    const certificate = form.getValues('certificate');
    const values = {
      companydetails: htmlContent,
      certificate,
    };
    dispatch(actions.doCreate(values));
  };

  const doFetch = () => {
    dispatch(listactions.doFetch());
  };

  useEffect(() => {
    if (record && record[0]?.companydetails) {
      setRecordContent(record[0].companydetails);
    }
    if (record && record[0]?.certificate) {
      form.setValue('certificate', record[0].certificate);
    }
  }, [record]);

  useEffect(() => {
    doFetch();

    if (recordContent) {
      const contentBlock = htmlToDraft(recordContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      }
    }
  }, [recordContent]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('company.menu'), '/company'],
          [i18n('company.title')],
        ]}
      />

      <ContentWrapper>
        {loading && <Spinner />}
        {!loading && record && (
          <Container fluid={true}>
            <Row>
              <Col xs={9}>
                <PageTitle>{i18n('company.title')}</PageTitle>
              </Col>
              <Col md="auto">
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ width: 250 }}
                  onClick={doSubmit}
                >
                  <ButtonIcon iconClass="far fa-save" /> &nbsp;
                  {i18n('common.save')}
                </button>
              </Col>
            </Row>

            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />

            <Row className="mt-4">
              <Col xs={12}>
                <h5>{i18n('company.fields.certificate')}</h5>
                <FormProvider {...form}>
                  <ImagesFormItem
                    name="certificate"
                    label={i18n('company.fields.certificate')}
                    required={false}
                    storage={Storage.values.companyCertificate}
                    max={1}
                  />
                </FormProvider>
              </Col>
            </Row>
          </Container>
        )}
      </ContentWrapper>
    </>
  );
}

export default CompanyDetails;
