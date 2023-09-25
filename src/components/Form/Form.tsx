import classNames from "classnames";

import { useContext, useState } from "react";
import { Superhero } from "../../types/Superhero"
import { Button } from "../Button";
import { Overlay } from "../Overlay";
import { Loader } from "../Loader";
import { createHero, updateHero } from "../../api/superheroes";
import { AppContext } from "../AppContext/AppContext";

type Props = {
  superhero?: Superhero;
  closeForm: () => void;
};

interface FormErrors {
  isNicknameError: boolean;
  isRealNameError: boolean;
  isOriginDescriptionError: boolean;
  isSuperpowersError: boolean;
  isCatchPhraseError: boolean;
  isImagesError: boolean;
}

export const Form: React.FC<Props> = ({ superhero, closeForm }) => {
  const { makeUpdate } = useContext(AppContext);

  const [formFields, setFormFields] = useState<Omit<Superhero, "_id">>({
    nickname: superhero?.nickname || '',
    real_name: superhero?.real_name || "",
    origin_description: superhero?.origin_description || "",
    superpowers: superhero?.superpowers || [],
    catch_phrase: superhero?.catch_phrase || "",
    images: superhero?.images || [],
  });

  // console.log(formFields);


  const [files, setFiles] = useState<FileList | null>(null);

  const [formErrors, setFormErrors] = useState<FormErrors>({
    isNicknameError: false,
    isRealNameError: false,
    isOriginDescriptionError: false,
    isSuperpowersError: false,
    isCatchPhraseError: false,
    isImagesError: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const changNicknameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      nickname: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isNicknameError: false,
    }));
  };

  const changeRealNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      real_name: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isRealNameError: false,
    }));
  };

  const changeOriginDescriptionHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      origin_description: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isOriginDescriptionError: false,
    }));
  };

  const changeSuperpowersHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      superpowers: event.target.value.split(", "),
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isSuperpowersError: false,
    }));
  };

  const changeCatchPhraseHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFormFields(currFields => ({
      ...currFields,
      catch_phrase: event.target.value,
    }));

    setFormErrors(currErrors => ({
      ...currErrors,
      isCatchPhraseError: false,
    }));
  };

  const changeImagesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList && fileList.length) {
      setFiles({ ...fileList });
    }

    setFormErrors(currErrors => ({
      ...currErrors,
      isImagesError: false,
    }));
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formFields.nickname.trim()) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isNicknameError: true,
      }));
    }

    if (!formFields.real_name.trim()) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isRealNameError: true,
      }));
    }

    if (!formFields.origin_description.trim()) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isOriginDescriptionError: true,
      }));
    }

    if (!formFields.superpowers.length) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isSuperpowersError: true,
      }));
    }

    if (!(files || formFields.images.length)) {
      setFormErrors(currErrors => ({
        ...currErrors,
        isImagesError: true,
      }));
    }


    if (!formFields.nickname.trim()
      || !formFields.real_name.trim()
      || !formFields.origin_description.trim()
      || !formFields.superpowers.length
      || !formFields.catch_phrase.trim()
      || !(files || formFields.images.length)
    ) {
      return;
    }

    if (!superhero) {
      const formData = new FormData()

      formData.append("nickname", formFields.nickname);
      formData.append("real_name", formFields.real_name);
      formData.append("origin_description", formFields.origin_description);

      formFields.superpowers.forEach(sp => {
        formData.append("superpowers", sp);
      });

      formData.append("catch_phrase", formFields.catch_phrase);

      if (files) {
        const filesArr = Object.values(files);

        for (let i = 0; i < filesArr.length; i++) {
          console.log(filesArr[i]);
          formData.append("images", filesArr[i]);
        }
      }

      try {
        setIsLoading(true);
        await createHero(formData);
        makeUpdate();
      } finally {
        setIsLoading(false);
        closeForm();
      }

      return;
    }

    const formData = new FormData()

    formData.append("nickname", formFields.nickname);
    formData.append("real_name", formFields.real_name);
    formData.append("origin_description", formFields.origin_description);

    formFields.superpowers.forEach(sp => {
      formData.append("superpowers", sp);
    });

    formData.append("catch_phrase", formFields.catch_phrase);

    if (files) {
      const filesArr = Object.values(files);

      for (let i = 0; i < filesArr.length; i++) {
        console.log(filesArr[i]);
        formData.append("images", filesArr[i]);
      }
    }

    try {
      setIsLoading(true);
      await updateHero(superhero._id, formData);
      makeUpdate();
    } finally {
      setIsLoading(false);
      closeForm();
    }
  }

  return isLoading ? (
    <Overlay>
      <Loader />
    </Overlay>
  ) : (
    <form className="form" onSubmit={onSubmitHandler}>
      <label className="form__label">
        Nickname:
        <input
          type="text"
          className={classNames("form__field", {
            "is-danger": formErrors.isNicknameError,
          })}
          placeholder="Enter nickname"
          value={formFields.nickname}
          onChange={changNicknameHandler}
        />
      </label>

      <label className="form__label">
        Real name:
        <input
          type="text"
          className={classNames("form__field", {
            "is-danger": formErrors.isRealNameError,
          })}
          placeholder="Enter real name"
          value={formFields.real_name}
          onChange={changeRealNameHandler}
        />
      </label>

      <label className="form__label">
        Description:
        <textarea
          rows={5}
          className={classNames("form__field", {
            "is-danger": formErrors.isOriginDescriptionError,
          })}
          placeholder="Provide description"
          value={formFields.origin_description}
          onChange={changeOriginDescriptionHandler}
        />
      </label>

      <label className="form__label">
        Superpowers:
        <textarea
          className={classNames("form__field", {
            "is-danger": formErrors.isSuperpowersError,
          })}
          placeholder="Superspeed, lazer vision..."
          value={formFields.superpowers.join(", ")}
          onChange={changeSuperpowersHandler}
        />
      </label>

      <label className="form__label">
        Catch phrase:
        <textarea
          className={classNames("form__field", {
            "is-danger": formErrors.isCatchPhraseError,
          })}
          placeholder="Enter catch phrase"
          value={formFields.catch_phrase}
          onChange={changeCatchPhraseHandler}
        />
      </label>

      <label className="form__label">
        Images:
        <input
          type="file"
          multiple
          className={classNames("form__field", {
            "is-danger": formErrors.isImagesError,
          })}
          placeholder="Choose imgs"
          onChange={changeImagesHandler}
        />
      </label>

      <Button
        text={!superhero ? "CREATE" : "UPDATE"}
        btnStyle="fill"
        btnType="submit"
        handler={() => { }}
      />
      <Button
        text="CANCEL"
        btnStyle="outline"
        btnType="reset"
        handler={closeForm}
      />
    </form>
  )
}
