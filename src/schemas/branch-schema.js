import moment from 'moment';
import * as yup from 'yup';

const optionalDateSchema = yup.array().of(
  yup.object().shape({
    start: yup.string().required().nullable().notOneOf(['Invalid date']),
    end: yup.string().required().nullable().notOneOf(['Invalid date']),
  }).noUnknown(true).strict(),
);

const requiredDateSchema = yup.array().of(
  yup.object().shape({
    start: yup
      .string()
      .nullable()
      .required()
      .notOneOf(['Invalid date'])
      .test('dateValidation', 'Start date should be always lower than end date', function () {
        const { start, end } = this.parent;
        const startTime = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');
        if (startTime?.isValid() && endTime?.isValid() && startTime.isSameOrAfter(endTime)) {
          return false;
        }
        return true;
      }),
    end: yup
      .string()
      .nullable()
      .required()
      .notOneOf(['Invalid date'])
      .test('dateValidation', 'End date should be always greater than start date', function () {
        const { start, end } = this.parent;
        const startTime = moment(start, 'HH:mm');
        const endTime = moment(end, 'HH:mm');

        if (startTime?.isValid() && endTime?.isValid() && endTime.isSameOrBefore(startTime)) {
          return false;
        }
        return true;
      }),
  }).noUnknown(true).strict(),
).min(1);

const weekDaySchema = yup.object().shape({
  enabled: yup.boolean().required(),
  data: yup
    .array()
    .when('enabled', {
      is: true,
      then: () => requiredDateSchema,
    })
    .when('enabled', {
      is: false,
      then: () => optionalDateSchema,
    })
    .required(),
}).noUnknown(true).strict();

const exceptionSchema = yup.object().shape({
  start: yup
    .string()
    .required()
    .notOneOf(['Invalid date'])
    .test('dateValidation', 'Start date should be always lower than end date', function () {
      const { start, end } = this.parent;
      const startTime = moment(start);
      const endTime = moment(end);
      if (startTime?.isValid() && endTime?.isValid() && startTime.isSameOrAfter(endTime)) {
        return false;
      }
      return true;
    }),
  end: yup
    .string()
    .required()
    .notOneOf(['Invalid date'])
    .test('dateValidation', 'End date should be always greater than start date', function () {
      const { start, end } = this.parent;
      const startTime = moment(start);
      const endTime = moment(end);
      if (startTime?.isValid() && endTime?.isValid() && endTime.isSameOrBefore(startTime)) {
        return false;
      }
      return true;
    }),
  repeat: yup.string().required().oneOf(['annually', 'one_time']),
}).noUnknown(true).strict();

const generalInfoSchema = yup
  .object()
  .shape({
    name: yup
      .object()
      .shape({
        ka: yup.string().required(),
        en: yup.string().required(),
      })
      .required().noUnknown(true)
      .strict(),
    address: yup.object().shape({
      ka: yup.string().required(),
      en: yup.string().required(),
    }).required().noUnknown(true)
      .strict(),
    email: yup.string().nullable(),
    phone: yup.string().nullable(),
  }).noUnknown(true).strict();

const workingHoursSchema = yup.object().shape({
  monday: weekDaySchema,
  tuesday: weekDaySchema,
  wednesday: weekDaySchema,
  thursday: weekDaySchema,
  friday: weekDaySchema,
  saturday: weekDaySchema,
  sunday: weekDaySchema,
}).noUnknown(true).strict();

export const branchSchema = yup.object().shape({
  general: generalInfoSchema,
  workingHours: workingHoursSchema,
  exceptions: yup.array().of(exceptionSchema),
}).noUnknown(true).strict();
