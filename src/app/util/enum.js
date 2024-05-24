import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';

class EnumValue {
    constructor(value, label) {
        this.value = value
        this.label = label
    }
}

export const weekdays = {
    Monday: new EnumValue(0, 'monday'),
    Tuesday: new EnumValue(1, 'tuesday'),
    Wednesday: new EnumValue(2, 'wednesday'),
    Thursday: new EnumValue(3, 'thursday'),
    Friday: new EnumValue(4, 'friday'),
    Saturday: new EnumValue(5, 'saturday'),
    Sunday: new EnumValue(6, 'sunday'),
}

export const daytimes = {
    Day: {
        id: 0,
        label: 'day',
        icon: mdiWeatherSunny
    },
    Night: {
        id: 1,
        label: 'night',
        icon: mdiWeatherNight
    }
}